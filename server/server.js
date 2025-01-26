const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const server = express();
//Ansluter till databasen. 
const db = new sqlite3.Database('./gik339-labb2.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Ansluten till databasen.');
  }
});

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });
//Skapar en get request för att hämta användare från databasen.
server.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.send(rows);
      }
  });
});
// Startar servern genom port 3000, skriver ut en bekräftelse för anslutningen i konsolen
server.listen(3000, () => {
  console.log("Server körs på http://localhost:3000");
});