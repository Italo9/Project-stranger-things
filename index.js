require('dotenv').config();
const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);
// t
app.use(cors());

const hereIsTheUpsideDown = process.env.UPSIDEDOWN_MODE;
const booleanHereIsTheUpsideDown = hereIsTheUpsideDown === 'true';
app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    booleanHereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});
// t
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Escutando na porta 3000');
});
