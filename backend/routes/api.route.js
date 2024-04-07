const express = require('express');
const router = express.Router();
const https = require('https');
require('dotenv').config();

router.get('/followers/:username', (req, res) => {
  const { username } = req.params;
  const options = {
    hostname: 'api.twitter.com',
    path: `/labs/2/users/by/username/${username}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.bearer_token}`,
    },
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const userData = JSON.parse(data);
        const followerCount = userData.data.public_metrics.followers_count;
        res.json({ username, followerCount });
      } catch (error) {
        console.error('Error parsing response:', error);
        res.status(500).json({ error: 'Unable to parse Twitter API response' });
      }
    });
  });

  request.on('error', (error) => {
    console.error('Error making request to Twitter API:', error);
    res.status(500).json({ error: 'Error making request to Twitter API' });
  });

  request.end();
});

module.exports = router;
