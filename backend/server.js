const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Url = require('./models/Url');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/urlshortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'URL required' });

  let shortCode;
  let exists = true;
  while (exists) {
    shortCode = generateShortCode();
    exists = await Url.findOne({ shortCode });
  }

  const url = new Url({ originalUrl, shortCode });
  await url.save();
  res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
});


app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const url = await Url.findOne({ shortCode });
  if (!url) return res.status(404).send('Not found');
  url.visitCount++;
  await url.save();
  res.redirect(url.originalUrl);
});

// Admin route: list all shortened URLs and their visit counts
app.get('/api/admin/urls', async (req, res) => {
  const urls = await Url.find({}, '-_id originalUrl shortCode visitCount');
  res.json({ urls });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
