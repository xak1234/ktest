const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const GITHUB_TOKEN = process.env.GITHUB_PAT;
const GITHUB_REPO = 'kieranscatapult/kieranscats';
const DATA_FILE_PATH = 'productData.json';

// Function to get the SHA of the data file
const getFileSha = async () => {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`;
    const response = await axios.get(url, {
      headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
    });
    return response.data.sha;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // File doesn't exist yet
    }
    throw error;
  }
};

// Endpoint to get product data
app.get('/api/data', async (req, res) => {
  try {
    const url = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${DATA_FILE_PATH}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.json({}); // Return empty object if file not found
    } else {
      console.error('Error fetching data from GitHub:', error);
      res.status(500).send('Error fetching data');
    }
  }
});

// Endpoint to save product data
app.post('/api/data', async (req, res) => {
  if (!GITHUB_TOKEN) {
    return res.status(500).send('GitHub token not configured.');
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`;
    const dataToSave = req.body;
    const content = Buffer.from(JSON.stringify(dataToSave, null, 2)).toString('base64');
    const sha = await getFileSha();

    const payload = {
      message: 'Update product data',
      content: content,
      branch: 'main'
    };
    
    if (sha) {
      payload.sha = sha;
    }

    await axios.put(url, payload, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data to GitHub:', error.response ? error.response.data : error.message);
    res.status(500).send('Error saving data');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 