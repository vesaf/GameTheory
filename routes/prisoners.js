var express = require('express');
var router = express.Router();
var path = require('path')
var pairingFinal = require('./pair');

var responses;
/* GET home page. */
router.get('/', function (req, res) {
  res = setHeaders(res);
  res.sendFile(path.resolve('./public/prisoners.html'));
  responses = (pairingFinal.pairing);
});

allEntered = true;
router.post('/send', function (req, res) {
  res = setHeaders(res);
  data = req.body;
  if (data.playerType == 0) {
    responses[data.pair].player1Outcome = data.response;
  }
  else {
    responses[data.pair].player2Outcome = data.response;
  }
  // console.log(responses);
  allEnteredTest = true;
  for (var i = 0; i < responses.length; i++) {
    console.log(responses[i].player1Outcome);
    console.log(responses[i].player2Outcome);
    if (responses[i].player1Outcome === undefined || responses[i].player2Outcome === undefined) {
      allEnteredTest = false;
      break;
    }
  }
  allEntered = allEnteredTest;
  console.log(responses);
  res.send();
});

router.get('/status', function (req, res) {
  res = setHeaders(res);
  // console.log(allEntered);
  res.send({allEntered: allEntered, responses: responses});
});

// Helper function that sets the res object
function setHeaders(res) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  return res;
}

module.exports = router;