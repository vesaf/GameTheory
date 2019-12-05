var express = require('express');
var router = express.Router();
var pairPlayers = require('./pair');
var status = require('./status').status;
var path = require('path');

// var status = { id: 0 };

/* GET home page. */
router.get('/', function (req, res) {
  res = setHeaders(res);
  res.sendFile('./public/index.html');
});

idCount = 0;
playerData = {playerCount: 0, players: []}
router.get('/id', function (req, res) {
  res = setHeaders(res);
  res.end(idCount.toString());
  playerData.players.push(idCount);
  console.log(idCount);
  idCount += 1;
  playerData.playerCount = idCount;
});

router.get('/idcount', function (req, res) {
  res = setHeaders(res);
  res.end(playerData.playerCount.toString());
});

router.post('/reset', function (req, res) {
  res = setHeaders(res);
  res.end();
  playerData.players = [];
  console.log("reset");
  idCount = 0;
  playerData.playerCount = idCount;
  status = {id: 2};
});

var pairingFinal;
router.get('/pair', function (req, res) {
  playerData.residualPlayers = playerData.players.slice();
  pairPlayers.executePair(playerData, function (pairing) {
    var treatRand = Math.random() < 0.5;
    console.log(treatRand);
    for (let i = 0; i < pairing.length; i++) {
      pairing[i].treatment = (i%2 == treatRand);
      console.log(JSON.stringify(pairing[i]));
    }
    res = setHeaders(res);
    res.end(JSON.stringify(pairing));
    pairingFinal = pairing;
    status = { id: 1, options: pairing };
  });
});

router.post('/refreshstatus', function (req, res) {
  res = setHeaders(res);
  res.end();
  console.log("refresh");
  status = {id: 0};
});

router.get('/dashboard', function (req, res) {
  res = setHeaders(res);
  res.sendFile(path.resolve('./public/dashboard.html'));
});

router.get('/getpairing', function (req, res) {
  res = setHeaders(res);
  res.end(JSON.stringify(pairingFinal));
});

// Send current status
router.get('/status', function (req, res) {
  res = setHeaders(res);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(status);
});

function pairPlayers(playerData, pairing, callback) {

  if (playerData.residualPlayers.length > 1) {
    let player1 = playerData.residualPlayers[0];
    let player2Index = Math.floor(Math.random() * (playerData.residualPlayers.length - 1)) + 1;
    let player2 = playerData.residualPlayers[player2Index];
    playerData.residualPlayers.splice(player2Index, 1);
    playerData.residualPlayers.shift();
    let rand = Math.random;
    if (Math.random() < 0.5) {
      pairing.push({player1: player1, player2: player2});
    }
    else {
      pairing.push({player1: player2, player2: player1});
    }
    pairPlayers(playerData, pairing, callback);
  }
  else {
    callback(pairing)
  }

}

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
module.exports.pairingFinal = this.pairingFinal;
