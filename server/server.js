const express = require('express');
const path = require('path');

const app = express();

const characters = [
  {
    name: 'Luffy',
    devilFruit: 'Gum-Gum Fruit'
  },
  {
    name: 'Smoker',
    devilFruit: 'Plume-Plume Fruit'
  },
  {
    name: 'Tony Tony Chopper',
    devilFruit: 'Human-Human Fruit'
  },
  {
    name: 'Brook',
    devilFruit: 'Revive-Revive Fruit'
  },
];

// the file path to the dist directory
const pathToFrontend = path.join(__dirname, '../frontend/dist');

// generate middleware using the file path
const serveStatic = express.static(pathToFrontend);

// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

// other controllers

// logRoutes middleware

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

const serveCharacters = (req, res, next) => {
  res.send(characters);
};

const serveGreeting = (req, res, next) => {
  const name = req.query.name || 'nakama';
  res.send({ message: `Welcome to our ship ${name}`});
};

const serve404 = (req, res, next) => {
  res.status(404).send({ error: `Not Found: ${req.originalUrl}`});
};

app.use(logRoutes);

app.get('/api/characters', serveCharacters);
app.get('/api/greeting', serveGreeting);

app.use(serve404);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
