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
                                if (data.enteredCount > 0) {
                                    var control1B = 0, control2B = 0, treatment1B = 0, treatment2B = 0;
                                    var treatmentCount = 0, controlCount = 0

                                    for (let i = 0; i < data.responses.length; i++) {
                                        var response = data.responses[i];
                                        console.log("treatment bool:", typeof(response.treatment));
                                        if (response.treatment) {
                                            treatment1B += parseInt(response.player1Outcome);
                                            treatment2B += parseInt(response.player2Outcome);
                                            treatmentCount++;
                                        }
                                        else {
                                            control1B += parseInt(response.player1Outcome);
                                            control2B += parseInt(response.player2Outcome);
                                            controlCount++;
                                        }
                                    }
                                    control1B = Math.round(100*(control1B/controlCount));
                                    control2B = Math.round(100*(control2B/controlCount));
                                    treatment1B = Math.round(100*(treatment1B/treatmentCount));
                                    treatment2B = Math.round(100*(treatment2B/treatmentCount));
                                    var dashboardContainer = document.createElement("DIV");
                                    dashboardContainer.className = "managementContainer";
                                    dashboardContainer.id = "resultsContainer";
                                    dashboardContainer.innerHTML += `
                                        <h2 id="statusTitle">Results:</h2>
                                        <table class= "resultsTable" id="controlResultsTable">
                                            <tbody>
                                                <tr>
                                                    <th>
                                                    </th><th>Control:</th>
                                                    <th></th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                    <th>A (` + (100-control2B) + `%)</th>
                                                    <th>B (` + control2B + `%)</th>
                                                </tr>
                                                <tr>
                                                    <th>A (` + (100-control1B) + `%)</th>
                                                    <th>80,40</th>
                                                    <th>40,80</th>
                                                </tr>
                                                <tr>
                                                    <th>B (` + control1B + `%)</th>
                                                    <th>40,80</th>
                                                    <th>80,40</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class= "resultsTable" id="treatmentResultsTable">
                                            <tbody>
                                                <tr>
                                                    <th>
                                                    </th><th>Treatment:</th>
                                                    <th></th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                    <th>A (` + (100-treatment2B) + `%)</th>
                                                    <th>B (` + treatment2B + `%)</th>
                                                </tr>
                                                <tr>
                                                    <th>A (` + (100-treatment1B) + `%)</th>
                                                    <th>80,40</th>
                                                    <th>40,80</th>
                                                </tr>
                                                <tr>
                                                    <th>B (` + treatment1B + `%)</th>
                                                    <th>40,80</th>
                                                    <th>80,40</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    `;
                                    document.getElementById("dashboardContainer").appendChild(dashboardContainer);
                                }
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
        console.log("reset");
        $.ajax({
            type: "POST",
            url: "/reset",
            success: function(data, err) {
                location.reload();
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