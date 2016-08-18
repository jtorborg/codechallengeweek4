//########setup##########//
var express = require('express');

var router = express.Router();

var pg = require('pg');

var connectionString = 'postgres://localhost:5432/zoo';
//########################//



router.get('/', function (req, res) {
  console.log("Hi");
  // Retrieve animals from database
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
console.log("client", client);
    client.query('SELECT * FROM zoo', function (err, result) {
      console.log("client", client);
      done(); // closes connection, which are limited to 10

      if (err) {
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var zoo = req.body;
  console.log(req.body);
  //

  //assign randomNumber functio to a variable
  var chooseAnimal = random.randomNumber(1, 100);
  //add object property req.body variable zoo


  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO zoo (name, total, chooseAnimal) '
                + 'VALUES ($1, $2)',
                [zoo.name, zoo.total, zoo.chooseAnimal],
                function (err, result) {
                  done();

                  if (err) {
                    res.sendStatus(500);
                  } else {
                    res.sendStatus(201);
                  }
                });
  });
});







function randomNumber(min, max){
       return Math.floor(Math.random() * (1 + max - min) + min);
   }


// ======================provides functionality outside of file=======================//
module.exports = router;
//########################//
