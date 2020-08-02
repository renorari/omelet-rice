const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log("Bot is OK!");
});
//Comannds
client.on('message', message => {
  var m = message.content
  if (m == "om!help") {
    message.channel.send("準備中...")
  } else if (m == "om!ping") {
    message.channel.send(`現在のBotのPing値は、${client.ws.ping}msです。`)
  }
})

client.login(process.env.omkey);

//--------------------//

var http = require("http");
var fs = require("fs");

function getType(_url) {
  var types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "svg+xml"
  };
  for (var key in types) {
    if (_url.endsWith(key)) {
      return types[key];
    }
  }
  return "text/plain";
}
var server = http.createServer(function(req, res) {
  if (req.url.match(/env/)) return;
  if (req.url.match(/main.js/)) return;
  if (req.url.match(/package.json/)) return;
  var url =
    "views" + (req.url.endsWith("/") ? req.url + "index.html" : req.url);
  if (fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": getType(url) });
        res.end(data);
      } else {
        res.statusCode = 500;
        res.end();
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Web is OK!")
});
