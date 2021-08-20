const axios = require('axios');
const ical2json = require('ical2json');
const ical = require('node-ical');
require('dotenv').config();

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getIcal() {
  const url = process.env.CAL_ADDRESS;
  if (!url) return;
  try {
    const response = await axios.get(url);
    console.log(response);

    // console.log(respJson);
    return response;
  } catch (error) {
    console.error(error);
  }
}

// do stuff in an async function
const getData = async () => {
  // or a URL
  const data = await ical.async.fromURL(process.env.CAL_ADDRESS);
  console.log(data);
};

getData();

const parseDate = () => {
  const d = new Date('2021-08-19T05:30:00.000Z');
  console.log(d.getUTCHours()); // Hours
  console.log(d.getUTCMinutes());
  console.log(d.getUTCSeconds());
};
parseDate();
