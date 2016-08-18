//================================================================
//                        SETUP
//================================================================


var express =  require('express');  //create variable looks in node folder to for express
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


// Our routes
var random = require("./routes/random");

app.use(bodyParser.urlencoded({ extended: true }));   //Must come after route variables

//================================================================
//                  ROUTE CONNECTION & USE
//================================================================

app.use('/random', random);


//=================
 //==================MOVED TO MODULE==================
//================= any app.post or app.get files should be moved to routes and renamed.


//================================================================
//                    STATIC FILES
//================================================================
// Catchall route
app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port')); //actively listening for requests
});
