I.		Create SignalR Hub
II.		Add Methods to Hub
III.	Add Client side SignalR
IV.		Connect to SignalR Hub from Client JS
V.		Call SignaIR Hub Method
VI		SignalR Hub invokes method in Client JS to notify clients.
VII.	Client receives update from SignalR hub and performs action.


1. Create ASP.NET Core APP Model-View-ModelContrller
2. Create folder Hubs
3. In Program.cs add code
builder.Services.AddSignalR();
// And then use maphub in app
app.MapHub<UserHub>("/hubs/userCount");


Create Userhub.cs in Hubs folder
using Microsoft.AspNetCore.SignalR;

namespace SignaIRWebClient.Hubs;
public class UserHub : Hub
{
    public static int TotalViews { get; set; }

    public async Task NewWindowLoaded()
    {
        TotalViews++;
        //Send update to all clients that total views have been updated
        await Clients.All.SendAsync("updateTotalViews", TotalViews);
    }
}

-> Hoàn thành được bước I,II, VI

4. Right click SignalRWebClient -> Add -> Client Side Library
provider unpkg
Library @microsoft/signalr@7.0.0

5. Move file signalr.js in wwwroot/lib/microsoft/signalr/webworker/signalr.js to folder wwwroot/js

--> Hoàn thành được bước III 

6. In Views/Home/Index.cshtml
<div class="container">
    <div class="row">
        <div class="col-3">Total Views: </div>
        <div class="col-4">
            <span id="totalViewsCounter"></span>
        </div>
    </div>
</div>

<script src="~/js/signalr.js"></script>
7. Create item usersCount.js in wwwroot/js/
//create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build(); // Url in program.cs

//connect to methods that hub invokes aka receive aka notifications from hub
connectionUserCount.on("updateTotalViews", (value) => { // updateTotalViews in UserHub.cs
    var newCountSpan = document.getElementById("totalViewsCounter"); // totalViewsCounter in index.cshtml
    newCountSpan.innerText = value.toString();
});

//invoke hub methos aka send notification to hub
function newWindowLoadedOnClient() {// newWindowLoaded in UserHub.cs
    connectionUserCount.send("NewWindowLoaded");
}

//Start connection
function fulfilled() {
    //do something on start
    console.log("Connection to User hub Successful");
}
function rejected() {
    //rejected logs
}

connectionUserCount.start().then(fulfilled, rejected);

--> Hoàn thành bước IV, V, VII

8. In Index.cshtml add
<script src="~/js/usersCount.js"></script>"


dotnet ef migrations add UpdateChatRoom
dotnet ef database update