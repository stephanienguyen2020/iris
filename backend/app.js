const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const AWS = require('aws-sdk');
const cors = require('cors');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const S3_BUCKET = process.env.S3_BUCKET;
const DYNAMO_TABLE = process.env.DYNAMO_TABLE;

app.post('/upload', upload.single('file'), async (req, res) => {

  const file = req.file;

  if (!file) {
    return res.status(400).send('File is required.');
  }

  const uniqueItemId = uuidv4();

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `${Date.now()}_${file.originalname}`, // Use a timestamp to ensure unique filenames
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const s3Response = await s3.upload(s3Params).promise();

    const dynamoParams = {
      TableName: DYNAMO_TABLE,
      Item: {
        item_id: uniqueItemId,
        s3Location: s3Response.Location,
        status: 'processing', // Initial status
        timestamp: new Date().toISOString(),
      },
    };

    await dynamoDB.put(dynamoParams).promise();

    res.status(200).json({ message: 'File uploaded to S3 and metadata stored in DynamoDB successfully!', itemId: uniqueItemId });
  } catch (error) {
    console.error('Error uploading to S3 or writing to DynamoDB:', error);
    res.status(500).json({ error: 'Error uploading to S3 or writing to DynamoDB' });
  }
});

const checkStatus = async (itemId) => {
  const dynamoParams = {
    TableName: DYNAMO_TABLE,
    Key: {
      item_id: itemId,
    },
  };

  try {
    const data = await dynamoDB.get(dynamoParams).promise();
    return data.Item ? data.Item.status : null;
  } catch (error) {
    console.error('Error querying DynamoDB:', error);
    throw new Error('Error querying DynamoDB');
  }
};

const getVideoFromS3 = async (itemId) => {
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `${itemId}_output_video.mp4`, // Assuming the output video is saved with this key
  };

  try {
    const data = await s3.getObject(s3Params).promise();
    return data.Body;
  } catch (error) {
    console.error('Error fetching video from S3:', error);
    throw new Error('Error fetching video from S3');
  }
};

app.get('/status/:itemId', async (req, res) => {
  const { itemId } = req.params;

  const pollStatus = async () => {
    let status = await checkStatus(itemId);
    while (status !== 'done') {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
      status = await checkStatus(itemId);
    }
    return status;
  };

  try {
    const finalStatus = await pollStatus();
    if (finalStatus === 'done') {
      const videoData = await getVideoFromS3(itemId);
      res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': videoData.length,
      });
      res.end(videoData);
    } else {
      res.status(500).json({ error: 'Error fetching the final status' });
    }
  } catch (error) {
    console.error('Error polling status:', error);
    res.status(500).json({ error: 'Error polling status' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
