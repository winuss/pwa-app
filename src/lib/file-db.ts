import { promises as fs } from "fs";

type JsonFileDB = PushSubscription[];

const filePath = "public/data/data.json";

//구독 정보 확인
export const getSubscriptionsData = async () => {
  return dataFileToJsonObject(filePath);
};

//구독 정보 저장
export const saveSubscriptionToData = async (
  subscription: PushSubscription
): Promise<JsonFileDB> => {
  const data = await updataDataFile(subscription);
  return Promise.resolve(data);
};

export const initFileData = async (): Promise<JsonFileDB> => {
  const data = await initDataFile();
  return Promise.resolve(data);
};

//update Json
const updataDataFile = async (subscription: PushSubscription) => {
  const jsonData = await dataFileToJsonObject(filePath);
  jsonData.push(subscription);

  const updatedDataJSON = JSON.stringify(jsonData, null, 2);
  await fs.writeFile(filePath, updatedDataJSON, "utf-8");

  return jsonData;
};

//file to Json
const dataFileToJsonObject = async (path: string): Promise<JsonFileDB> => {
  const fileContents = await fs.readFile(path, "utf8");
  return JSON.parse(fileContents) as JsonFileDB;
};

//파일 데이터 초기화
const initDataFile = async () => {
  const updatedDataJSON = JSON.stringify([], null, 2);
  await fs.writeFile(filePath, updatedDataJSON, "utf-8");

  return [];
};
