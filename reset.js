const axios = require('axios');

let resetUrl = process.env.RESET_URL;

let apiKey = process.env.GPT_API_KEY;

const headers = {
    'Authorization': `Bearer ${apiKey}`,
};

axios.post(resetUrl, headers)
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  });

