var express = require("express");
var server = express();
var port = process.env.Port || 8080;

server.use(express.static(__dirname+"/public"));

server.get("/", function(request, response){
    response.sendFile("public/html/index.html", {root:__dirname});

});

server.listen(port, function(){
  console.log("Now Listening on port..", port);
});
