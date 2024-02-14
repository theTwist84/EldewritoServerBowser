$(document).ready(function()
{
   // addServer("127.0.0.1:11775", "Test server", "emoose", "Guardian", "guardian", "Team Slayer", "1", "16");
});

$("#refresh").click(function()
{
    $("#serverlist").find("tr:gt(0)").remove();
    $.getJSON( "http://master.zgaf.io/list", function( data ) {
        if(data.result.code != 0)
        {
            alert("Error received from master: " + data.result.msg);
            return;
        }
        console.log(data);
        for(var i = 0; i < data.result.servers.length; i++)
        {
            var serverIP = data.result.servers[i];
            queryServer(serverIP);
        }
    });
});
    
function queryServer(serverIP)
{
    console.log(serverIP);
    $.getJSON("http://" + serverIP, function(serverInfo) {
        var isPassworded = serverInfo.passworded !== undefined;
        addServer(serverIP, isPassworded, serverInfo.name, serverInfo.hostPlayer, serverInfo.map, serverInfo.mapFile, serverInfo.variant, serverInfo.status, serverInfo.numPlayers, serverInfo.maxPlayers);
        console.log(serverInfo);
    });
}

function promptPassword(serverIP)
{
    var password = prompt("The server at " + serverIP + " is passworded, enter the password to join", "");
    if(password != null)
    {
        window.open("dorito:" + serverIP + "/" + password);
    }
}

function addServer(ip, isPassworded, name, host, map, mapfile, gamemode, status, numplayers, maxplayers)
{
    var servName = "<td><a href=\"dorito:" + ip + "\">" + name + " (" + host + ")</a></td>";
    if(isPassworded)
        servName = "<td><a href=\"#\" onclick=\"promptPassword('" + ip + "');\">[PASSWORDED] " + name + " (" + host + ")</a></td>";
        
    var servMap = "<td>" + map + " (" + mapfile + ")</td>";
    var servType = "<td>" + gamemode + "</td>";
    var servStatus = "<td>" + status + "</td>";
    var servPlayers = "<td>" + numplayers + "/" + maxplayers + "</td>";

    $('#serverlist tr:last').after("<tr>" + servName + servMap + servType + servStatus + servPlayers + "</tr>");
}
