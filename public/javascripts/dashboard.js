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

    var paired = false;
    document.getElementById("pairBtn").addEventListener('click', function() {
        $.ajax({
            url: "/pair",
            success: function(data, err) {
                data = JSON.parse(data);
                if (data.length > 0 && !paired) {
                    paired = true;
                    document.getElementById("statusContent").innerHTML = "Playing";
                    document.getElementById("statusManagementContainer").innerHTML += `
                        <h2 id='pairCountLabel'>Finished pairs:</h2>
                        <h2 id='pairCountContent'>0/0</h2>
                        <button id='showResultsBtn' class='playerManagementBtn'>Show results</button>`;
                    document.getElementById("showResultsBtn").addEventListener("click", function() {
                        $.ajax({
                            url: "/prisoners/status",
                            success: function (data) {
                                // TODO: Continue tomorrow
                                // TODO: Why not work twice in a row
                                // TODO: Have to reset server after reset after starting game
                                // if (document.getElementById("resultsContainer")) {
                                //     document.getElementById("dashboardContainer").removeChild(document.getElementById("resultsContainer"));
                                // }
                                // var treatment1A = 0;
                                // var control1A = 0;

                                // for (let i = 0; i < data.responses.length; i++) {
                                //     if (data.responses[i].player1Outcome !== undefined && data.responses[i].player2Outcome !== undefined) {
                                //         if (data.responses[i].treatment && data.responses[i].player1Outcome) {

                                //         }
                                //     }
                                // }
                                document.getElementById("dashboardContainer").innerHTML += `
                                <div class="managementContainer" id="resultsContainer">
                                    <h2 id="statusTitle">Results:</h2>
                                    <table id="resultsTable">
                                        <tbody>
                                            <tr>
                                                <th>
                                                </th><th>Control:</th>
                                                <th>Treatment:</th>
                                            </tr>
                                            <tr>
                                                <th>A</th>
                                                <th id="controlA">40%</th>
                                                <th id="treatmentA">55%</th>
                                            </tr>
                                            <tr>
                                                <th>B</th>
                                                <th id="controlB">60%</th>
                                                <th id="treatmentB">45%</th>
                                            </tr>
                                        </tbody>
                                    </table>       
                                </div>`;
                            }
                        });

                    });
                    setInterval(function() {
                        $.ajax({
                            url: "/prisoners/status",
                            success: function (data) {
                                document.getElementById("pairCountContent").innerHTML = (data.enteredCount | "0") + "/" + data.responses.length;
                            }
                        });
                    }, 1000);
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
                location.reload();
                // document.getElementById("statusContent").innerHTML = "Gathering players";
                // document.getElementById("statusManagementContainer").removeChild(document.getElementById("pairCountLabel"));
                // document.getElementById("statusManagementContainer").removeChild(document.getElementById("pairCountContent"));
                // document.getElementById("statusManagementContainer").removeChild(document.getElementById("showResultsBtn"));
                // document.getElementById("dashboardContainer").removeChild(document.getElementById("resultsContainer"));
                // clearInterval(pairStatusInterval);
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