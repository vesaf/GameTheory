window.addEventListener("load", function() {
    getId();

    var count = 0;
    this.setInterval(function() {
        if (count == 3) {
            document.getElementById("waitMessage").innerHTML = document.getElementById("waitMessage").innerHTML.slice(0, -3);
            count = 0;
        }
        else {
            document.getElementById("waitMessage").innerHTML += ".";
            count++;
        }
    }, 1000);
});

function getId() {
    var id;
    if (!localStorage.getItem('id')) {
        $.ajax({
            url: "/id",
            success: function(data, err) {
                localStorage.setItem('id', data);
                id = data;
                // waitForPairing();
                initializeStatus();
            },
            error: function () {
                alert("Error, could not get id.");
            }
        });
    }
    else {
        id = localStorage.getItem(parseInt('id'));
        // waitForPairing();
        initializeStatus();
    }
}

// function waitForPairing() {
//     // Set times between intervals
//     var intervalTime = 1000;

//     // Start interval at each of which status checks are performed
//     var firstInterval = true;
//     var lastStatus;
//     var statusInterval = setInterval(function () {
//         // Request status
//         jQuery.ajax({
//             url: "/status",
//             success: function (data, status, jqXHR) {
//                 if (firstInterval) {
//                     lastStatus = data.id;
//                     firstInterval = false;
//                 }
//                 if (data.id !== lastStatus) {
//                     console.log(data);
//                     lastStatus = data.id;
//                     functionCalls(data.id, data.options);
//                 }
//             },
//             error: function (jqXHR, status) {
//                 // TODO
//             }
//         });
//     }, intervalTime);

//     // Clear interval when navigating to next page
//     window.addEventListener("beforeunload", function () {
//         clearInterval(statusInterval);
//     });

//     // Call a function depending on requested status
//     function functionCalls(statusId, options) {
//         switch (statusId) {
//             case 1:
//                 var id = localStorage.getItem('id');
//                 for (var i = 0; i < options.length; i ++) {
//                     var pair = options[i];
//                     console.log("pair", i);
//                     console.log("id", id);
//                     console.log(pair);
//                     if (pair.player1 == id) {
//                         console.log("player1");
//                         localStorage.setItem('player', 0);
//                         localStorage.setItem('pair', i);
//                         localStorage.setItem('treatment', pair.treatment);
//                         // document.location.href += "prisoners";
//                     }
//                     else if (pair.player2 == id) {
//                         console.log("player2");
//                         localStorage.setItem('player', 1);
//                         localStorage.setItem('pair', i);
//                         localStorage.setItem('treatment', pair.treatment);
//                         // document.location.href += "prisoners";
//                     }
//                 }
//                 break;
//             case 2:
//                 clearInterval(statusInterval);
//                 localStorage.clear();
//                 getId();
//                 break;
//             default:
//                 console.error("The server wants to tell you something but it doesn't know how to.");
//                 console.log(id);
//                 console.log(options);
//         }
//     }
// }