import fs from "fs";
import {v4 as uuidv4} from "uuid";

// script to generate dummy data for time series graph
// will store in data/dummy-data.json
// run `node generateDummyData.js` to run the script

function generateDummyData() {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);

  const data = [];
  let currentDate = startDate;

  const minBytes = 1024 // 1 KB
  const maxBytes = 1024 * 1024 * 1024; // 1 GB

  while(currentDate <= endDate) {
    const readIops = parseFloat((10000 + Math.random() * 90000).toFixed(4))
    const writeIops = parseFloat((100 + Math.random() * 900).toFixed(4))
    const readThroughput = parseFloat((Math.random() * (maxBytes - minBytes + 1) + minBytes).toFixed(4));
    const writeThroughput = parseFloat((Math.random() * (maxBytes - minBytes + 1) + minBytes).toFixed(4));

    data.push({date: currentDate.toISOString(), readIops, writeIops, readThroughput, writeThroughput})

    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  }

  return data;
}

const dummyData = generateDummyData();
const id = uuidv4();

const jsonObject = {
  name: "MyCluster",
  id,
  data: dummyData
}


fs.writeFileSync('data/dummy-data.json', JSON.stringify(jsonObject, null, 2))
