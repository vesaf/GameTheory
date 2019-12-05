window.addEventListener("load", function() {
    initializeStatus();
    var clicked = this.localStorage.getItem('clicked') == "true";
    var playerType = parseInt(this.localStorage.getItem('player'));
    const gameControl = [[[80, 40], [40,80]], [[40,80], [80,40]]];
    const gameTreatment = [[[320, 40], [40,80]], [[40,80], [80,40]]];
    var treatment = localStorage.getItem('treatment') == 'true';
    var game = treatment ? gameTreatment : gameControl;
    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j < game[i].length; j++) {
            document.getElementById("box"+j+i).innerHTML = game[i][j][0] + "," + game[i][j][1];
        }
    }
    document.getElementById("playerType").innerHTML = "You are player " + (playerType + 1).toString();
    document.getElementById("confessBtn").addEventListener("click", function(e) {sendResponse(e, 0)}, false);
    document.getElementById("denyBtn").addEventListener("click", function(e) {sendResponse(e, 1)}, false);

    function sendResponse(e, type) {
        if (!clicked) {
            var id = parseInt(localStorage.getItem('id'));
            var pair = parseInt(localStorage.getItem('pair'));
            var playerType = parseInt(this.localStorage.getItem('player'));
            $.ajax({
                type: "POST",
                url: "/prisoners/send",
                data: {playerType: playerType, pair: pair, response: type},
                success: function() {
                    setInterval(function() {
                        $.ajax({
                            url: "/prisoners/status",
                            success: function (data) {
                                if (data.responses[pair].player1Outcome && data.responses[pair].player2Outcome) {
                                    console.log(data.responses);
                                    document.getElementById("payoff").innerHTML = "Your payoff is: " + game[parseInt(data.responses[pair].player1Outcome)][parseInt(data.responses[pair].player2Outcome)][playerType];
                                }
                            }
                        });
                    }, 1000);
                }
            });
            clicked = true;
            localStorage.setItem('clicked') = "true";
        }
        else {
            alert("You already made a choice");
        }
    }
});


