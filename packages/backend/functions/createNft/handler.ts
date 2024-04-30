import { randomUUID } from 'crypto';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const client = new DynamoDBClient({ region: 'eu-west-1' });

export const main = async (): Promise<any> => {
  const id = randomUUID();
  const positionX = randomIntFromInterval(5, 90);
  const positionY = randomIntFromInterval(10, 90);
  const imageIndex = Math.floor(Math.random() * 5);

  const item = {
    PK: { S: 'NFT' },
    SK: { S: id },
    id: { S: id },
    positionX: { N: positionX.toString() },
    positionY: { N: positionY.toString() },
    imageIndex: { N: imageIndex.toString() },
  };
  await client.send(
    new PutItemCommand({ TableName: process.env.NFT_TABLE_NAME, Item: item }),
  );

  return {
    id,
    positionX,
    positionY,
    imageIndex,
  };
};
