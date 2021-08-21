const ical = require('node-ical');
const getData = async () => {
    const data = await ical.async.fromURL(process.env.CAL_ADDRESS);
    const resp = await data;
    return resp;
};

export default getData;