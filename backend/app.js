const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const AWS = require('aws-sdk');
const cors = require('cors');
require('dotenv').config();

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
  console.log("did it come here by any chance")
  const { text, item_id } = req.body;
  const file = req.file;

  if (!file || !text || !item_id) {
    return res.status(400).send('File, text input, and item ID are required.');
  }

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
        item_id: item_id,
        text: text,
        s3Location: s3Response.Location,
        timestamp: new Date().toISOString(),
      },
    };

    await dynamoDB.put(dynamoParams).promise();

    res.status(200).json({ message: 'File uploaded to S3 and metadata stored in DynamoDB successfully!' });
  } catch (error) {
    console.error('Error uploading to S3 or writing to DynamoDB:', error);
    res.status(500).json({ error: 'Error uploading to S3 or writing to DynamoDB' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
