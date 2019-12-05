function pairPlayers(playerData, pairing, callback) {

    if (playerData.residualPlayers.length > 1) {
      let player1 = playerData.residualPlayers[0];
      let player2Index = Math.floor(Math.random() * (playerData.residualPlayers.length - 1)) + 1;
      let player2 = playerData.residualPlayers[player2Index];
      playerData.residualPlayers.splice(player2Index, 1);
      playerData.residualPlayers.shift();
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

function executePair(playerData, callback) {
    console.log(playerData);
    pairPlayers(playerData, [], function (pairing) {
        module.exports.pairing = pairing;
        callback(pairing);
    });
}

module.exports.executePair = executePair;