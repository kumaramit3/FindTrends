import {
  S3Client,
  CreateBucketCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutBucketEncryptionCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import "dotenv/config";

const ENV = process.env;

const S3 = new S3Client({
  region: ENV.MY_AWS_REGION,
  endpoint: ENV.MY_AWS_ENDPOINT,
  credentials: {
    accessKeyId: ENV.MY_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: ENV.MY_AWS_SECRET_ACCESS_KEY as string,
  },
});

const CreateBucket = async (Bucket = "") => {
  try {
    const command = new CreateBucketCommand({
      Bucket,
    });
    await S3.send(command);
    console.log(`Bucket-> ${Bucket} is created successfully`);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const GetObjectFromBucket = async (Bucket = "", Key = "") => {
  try {
    const command = new GetObjectCommand({
      Bucket,
      Key,
    });
    const { Body } = await S3.send(command);
    const response = await Body?.transformToString();
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const PutObjectInBucket = async (Bucket = "", Key = "", Body = "") => {
  try {
    const command = new PutObjectCommand({
      Bucket,
      Key,
      Body,
    });
    await S3.send(command);
    console.log(`Data stored with Key->${Key} in Bucket->${Bucket}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

const PutBucketEncryption = async (Bucket = "") => {
  try {
    const command = new PutBucketEncryptionCommand({
      Bucket,
      ServerSideEncryptionConfiguration: {
        Rules: [
          {
            ApplyServerSideEncryptionByDefault: {
              SSEAlgorithm: "AES256",
            },
          },
        ],
      },
    });
    await S3.send(command);
    console.log(`Default encryption enabled for Bucket-> ${Bucket}`);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const ListBucketKeys = async (Bucket = "") => {
  try {
    const command = new ListObjectsCommand({
      Bucket,
    });
    const { Contents } = await S3.send(command);
    return Contents;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const DeleteObjectsFromBucket = async (Bucket = "", Key = " ") => {
  try {
    const command = new DeleteObjectCommand({
      Bucket,
      Key,
    });
    await S3.send(command);
    console.log(`deleted object with Key-> ${Key} from Bucket-> ${Bucket}`);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export {
  CreateBucket,
  GetObjectFromBucket,
  PutObjectInBucket,
  PutBucketEncryption,
  ListBucketKeys,
  DeleteObjectsFromBucket,
};
