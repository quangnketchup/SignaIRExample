//create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build(); // Url in program.cs

//connect to methods that hub invokes aka receive aka notifications from hub
connectionUserCount.on("updateTotalViews", (value) => { // updateTotalViews in UserHub.cs
    var newCountSpan = document.getElementById("totalViewsCounter"); // totalViewsCounter in index.cshtml
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
});

//invoke hub methos aka send notification to hub
function newWindowLoadedOnClient() {
    connectionUserCount.invoke("NewWindowLoaded", "Bhrugen").then((value) => console.log(value));
}

//Start connection
function fulfilled() {
    //do something on start
    console.log("Connection to User hub Successful");
    newWindowLoadedOnClient();
}
function rejected() {
    //rejected logs
}

connectionUserCount.start().then(fulfilled, rejected);