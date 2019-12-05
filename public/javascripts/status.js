 function initializeStatus() {
    // Set times between intervals
    var intervalTime = 1000;

    // Start interval at each of which status checks are performed
    var firstInterval = true;
    var lastStatus;
    var statusInterval = setInterval(function () {
        // Request status
        jQuery.ajax({
            url: "/status",
            success: function (data, status, jqXHR) {
                if (firstInterval) {
                    lastStatus = data.id;
                    firstInterval = false;
                }
                if (data.id !== lastStatus) {
                    console.log(data);
                    lastStatus = data.id;
                    functionCalls(data.id, data.options);
                }
            },
            error: function (jqXHR, status) {
                // TODO
            }
        });
    }, intervalTime);

    // Clear interval when navigating to next page
    window.addEventListener("beforeunload", function () {
        clearInterval(statusInterval);
    });

    // Call a function depending on requested status
    function functionCalls(statusId, options) {
        switch (statusId) {
            case 1:
                console.log(window.location);
                if (window.location.pathname == '/') {
                    const id = localStorage.getItem('id');
                    for (var i = 0; i < options.length; i ++) {
                        var pair = options[i];
                        console.log("pair", i);
                        console.log("id", id);
                        console.log(pair);
                        if (pair.player1 == id) {
                            console.log("player1");
                            localStorage.setItem('player', 0);
                            localStorage.setItem('pair', i);
                            localStorage.setItem('treatment', pair.treatment);
                            document.location.href += "prisoners";
                        }
                        else if (pair.player2 == id) {
                            console.log("player2");
                            localStorage.setItem('player', 1);
                            localStorage.setItem('pair', i);
                            localStorage.setItem('treatment', pair.treatment);
                            document.location.href += "prisoners";
                        }
                    }
                }
                break;
            case 2:
                clearInterval(statusInterval);
                localStorage.clear();
                window.location = '/';
                break;
            default:
                console.error("The server wants to tell you something but it doesn't know how to.");
                console.log(localStorage.getItem('id'));
                console.log(options);
        }
    }
}