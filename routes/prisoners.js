var express = require('express');
var router = express.Router();
var path = require('path')
var pairingFinal = require('./pair');

// var pairingFinal.responses;
/* GET home page. */
router.get('/', function (req, res) {
  // pairingFinal.enteredCount = 0;
  res = setHeaders(res);
  res.sendFile(path.resolve('./public/prisoners.html'));
  // pairingFinal.responses = pairingFinal.pairing;
});

// router.post('/prepare', function (req, res) {
//   pairingFinal.responses = pairingFinal.pairing;
//   pairingFinal.enteredCount = 0;
//   res = setHeaders(res);
//   res.end();
// });

// allEntered = true;
// var pairingFinal.enteredCount = 0;
router.post('/send', function (req, res) {
  res = setHeaders(res);
  data = req.body;
  if (data.playerType == 0) {
    pairingFinal.responses[data.pair].player1Outcome = data.response;
  }
  else {
    pairingFinal.responses[data.pair].player2Outcome = data.response;
  }
  // console.log(pairingFinal.responses);
  // allEnteredTest = true;
  pairingFinal.enteredCount = 0;
  for (var i = 0; i < pairingFinal.responses.length; i++) {
    console.log(pairingFinal.responses[i].player1Outcome);
    console.log(pairingFinal.responses[i].player2Outcome);
    if (pairingFinal.responses[i].player1Outcome !== undefined && pairingFinal.responses[i].player2Outcome !== undefined) {
      // allEnteredTest = false;
      pairingFinal.enteredCount++;
      // break;
    }
  }
  // allEntered = allEnteredTest;
  console.log(pairingFinal.responses);
  res.send();
});

router.get('/status', function (req, res) {
  res = setHeaders(res);
  // console.log(allEntered);
  res.send({enteredCount: pairingFinal.enteredCount, allEntered: pairingFinal.enteredCount === pairingFinal.responses.length, responses: pairingFinal.responses});
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