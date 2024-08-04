import React from 'react';
import AWS from 'aws-sdk';

const executeScript = async (S3_BUCKET, item_id) => {
  try {
    const REGION = import.meta.env.VITE_AWS_REGION;
    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      region: REGION,
    });
    const s3 = new AWS.S3();

    // Script content
    const scriptContent = `#!/bin/bash
      if [ $# -ne 2 ]; then
        echo "Usage: $0 <item_id> <S3_BUCKET>"
        exit 1
      fi

      item_id=$1
      S3_BUCKET=$2

      echo "Script execution started" > /home/ec2-user/script.log
      echo "Processing file with item_id: \${item_id}"

      # Fetch row from DynamoDB
      INPUT_TEXT=$(aws dynamodb get-item --table-name fileUploaduser --key '{"id": {"S": "'\${item_id}'"}}' --projection-expression "input_text" --query "Item.input_text.S" --output text)

      echo "Input text from DynamoDB: $\{INPUT_TEXT}"

      # Count characters in input_text
      CHAR_COUNT=$(echo -n "\${INPUT_TEXT}" | wc -m)

      echo "Number of characters in input text: \${CHAR_COUNT}"

      aws s3 cp s3://\${S3_BUCKET}/\${item_id}/input_file.txt /home/ec2-user/input.txt

      # Append character count to input file
      echo "Number of characters in input text: \${CHAR_COUNT}" >> /home/ec2-user/input.txt

      # Upload modified input file as output.txt to S3
      aws s3 cp /home/ec2-user/input.txt s3://\${S3_BUCKET}/\${item_id}/output_file.txt

      # Set output file path in DynamoDB
      aws dynamodb update-item --table-name fileUploaduser --key '{"id": {"S": "'\${item_id}'"}}' --update-expression "SET output_file_path = :o" --expression-attribute-values '{":o": {"S": "s3://${S3_BUCKET}/${item_id}/output_file.txt\"}}'

      EC2_INSTANCE_ID=$(ec2-metadata -i | cut -d ' ' -f 2)

      echo "Fetched EC2 instance ID: \${EC2_INSTANCE_ID}" >> /home/ec2-user/script.log

      # Terminate EC2 instance
      echo "Terminating EC2 instance with ID: \${EC2_INSTANCE_ID}" >> /home/ec2-user/script.log
      aws ec2 terminate-instances --instance-ids \${EC2_INSTANCE_ID}

      echo "Instance termination requested for Instance ID: \${EC2_INSTANCE_ID}" >> /home/ec2-user/script.log
    `;


    const scriptParams = {
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: `script.sh`,
      Body: scriptContent,
      ContentType: 'text/x-shellscript'
    };

    const uploadScriptResult = await s3.upload(scriptParams).promise();
    console.log('Script file uploaded successfully:', uploadScriptResult);
    
    return uploadScriptResult;
  } catch (error) {
    console.error('Error executing script:', error);
    throw error;
  }
};

export default executeScript