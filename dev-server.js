const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let state = {
  home: 0,
  away: 0,
  inning: 1,
  outsInInning: 0
};

app.get('/api/score-board/load', (req, res) => {
  res.json(state);
});

app.post('/api/score-board/update', (req, res) => {
  state = req.body.payload;
  res.json(state);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});