window.addEventListener("load", function() {
    const playerCountLabel = document.getElementById("playerCount");
    setInterval(function () {
        $.ajax({
            url: "/idcount",
            success: function(data, err) {
                playerCountLabel.innerHTML = data;
            },
            error: function () {
                console.error("Error, could not get player count.");
            }
        });
    }, 1000);

    document.getElementById("pairBtn").addEventListener('click', function() {
        $.ajax({
            url: "/pair",
            success: function(data, err) {
                data = JSON.parse(data);
                if (data.length > 0) {
                    document.getElementById("statusContent").innerHTML = "Playing";
                }
            },
            error: function () {
                alert("Error, could not pair players.");
            }
        });
    });

    document.getElementById("resetBtn").addEventListener('click', function() {
        $.ajax({
            type: "POST",
            url: "/reset",
            success: function(data, err) {
                document.getElementById("statusContent").innerHTML = "Gathering players";
            },
            error: function () {
                alert("Error, could not reset.");
            }
        });
    });

    document.getElementById("refreshStatusBtn").addEventListener('click', function() {
        $.ajax({
            type: "POST",
            url: "/refreshstatus",
            success: function(data, err) {
            },
            error: function () {
                alert("Error, could not refresh status.");
            }
        });
    });
});