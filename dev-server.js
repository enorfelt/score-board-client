const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let state = {
  home: 0,
  away: 0,
  inning: 1,
  outsInInning: 0
};

app.get('/api/score-board/load', (req, res) => {
  res.json(state);
});

app.post('/api/score-board/update', async (req, res) => {
  await sleep(getRandomInt(20, 500));
  state = req.body.payload;
  res.json(state);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});