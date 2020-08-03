const Discord = require("discord.js");
const client = new Discord.Client();
const http = require("http");
const https = require("https");
const fs = require("fs");
const fetch = require("node-fetch");

client.on("ready", () => {
  client.user.setPresence({
    activity: {
      name: `om!help | ${client.guilds.cache.size}servers | ${client.users.cache.size}member`
    },
    status: "idle"
  });
  console.log(client.user.tag + " is OK!");
  client.channels.cache
    .get("739472966060081236")
    .send("https://omelet-rice.glitch.me/");
  setInterval(function() {
    client.channels.cache
      .get("739472966060081236")
      .send("https://omelet-rice.glitch.me/");
  }, 60000);
});

//Comannds
client.on("message", message => {
  var m = message.content;
  if (m == "om!help") {
    message.channel.send("申し訳ございません。\n現在、準備中です。");
  } else if (m == "om!ping") {
    message.channel.send(`現在のBotのPing値は、${client.ws.ping}msです。`);
  } else if (m == "om!invite") {
    message.channel.send(
      "招待リンクはこちらです。\nhttps://omelet-rice.glitch.me/"
    );
  }
});

//広告
var aco = 0;
var array = [
  fs.readFileSync("views/ads/01.txt", "utf8"),
  fs.readFileSync("views/ads/02.txt", "utf8"),
  fs.readFileSync("views/ads/03.txt", "utf8"),
  fs.readFileSync("views/ads/04.txt", "utf8")
];
client.on("message", message => {
  if (message.content.startsWith("om!")) {
    aco += 1;
    if (aco >= 3) {
      aco = 0;
      message.channel.send({
        content: "オム丼 - 広告",
        embed: {
          title: "オム丼 - 広告",
          description: "[この広告について](http://www.onamae.com/)",
          color: 0xf0f016,
          footer: {
            text: "ＧＭＯインターネット株式会社「東証一部上場企業」"
          },
          fields: [
            {
              name: "独自ドメインの取得なら１円～の【お名前.com】",
              value: array[Math.floor(Math.random() * array.length)]
            }
          ]
        }
      });
    }
  }
  if (message.content == "om!広告") {
    message.channel.send({
      content: "オム丼 - 広告",
      embed: {
        title: "オム丼 - 広告",
        description: "[この広告について](http://www.onamae.com/)",
        color: 0xf0f016,
        footer: {
          text: "ＧＭＯインターネット株式会社「東証一部上場企業」"
        },
        fields: [
          {
            name: "独自ドメインの取得なら１円～の【お名前.com】",
            value: array[Math.floor(Math.random() * array.length)]
          }
        ]
      }
    });
  }
});

//グローバルチャット
client.on("message", message => {
  if (message.author.id == client.user.id && message.embeds.length) return;
  if (message.channel.name == "ome-chat") {
    const file = message.attachments.first();
    var embed;
    var avatar = message.author.avatarURL({
      format: "png",
      dynamic: true,
      size: 1024
    });
    var gicon = message.guild.iconURL({
      format: "png",
      dynamic: true,
      size: 512
    });
    if (
      message.author.avatarURL({
        format: "png",
        dynamic: true,
        size: 1024
      }) == null
    ) {
      avatar = "https://cdn.discordapp.com/embed/avatars/0.png";
    }
    if (
      message.guild.iconURL({
        format: "png",
        dynamic: true,
        size: 512
      }) == null
    ) {
      gicon = "https://cdn.discordapp.com/embed/avatars/0.png";
    }
    if (!file) {
      embed = {
        embed: {
          description: message.content,
          color: 0xf0f016,
          timestamp: new Date(),
          footer: {
            icon_url: gicon,
            text: message.guild.name
          },
          thumbnail: {
            url: avatar
          },
          author: {
            name: message.author.tag,
            url: "https://discord.com/users/" + message.author.id,
            icon_url: avatar
          }
        }
      };
    } else if (file.height) {
      embed = {
        embed: {
          description: message.content,
          color: 0xf0f016,
          timestamp: new Date(),
          footer: {
            icon_url: gicon,
            text: message.guild.name
          },
          thumbnail: {
            url: avatar
          },
          author: {
            name: message.author.tag,
            url: "https://discord.com/users/" + message.author.id,
            icon_url: avatar
          },
          image: {
            url: file.url
          }
        }
      };
    } else if (file) {
      embed = {
        embed: {
          description:
            message.content +
            "\n\n添付ファイル: " +
            `[${file.name}](${file.url})`,
          color: 0xf0f016,
          timestamp: new Date(),
          footer: {
            icon_url: gicon,
            text: message.guild.name
          },
          thumbnail: {
            url: avatar
          },
          author: {
            name: message.author.tag,
            url: "https://discord.com/users/" + message.author.id,
            icon_url: avatar
          }
        }
      };
    }
    client.channels.cache.forEach(channel => {
      if (channel.name == "ome-chat" && channel.type == "text") {
        channel.send(embed);
        message.react("☑");
        if (!file) message.delete();
        if (message.embeds.length) {
          channel.send(message.embeds);
        }
      }
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

//--------------------//

function getType(_url) {
  var types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "svg+xml; charset=utf-8"
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
        if (url.endsWith(".html")) {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(
            data +
              '\n<center><script type="text/javascript" src="//rot6.a8.net/jsa/822e75fcc79c79da0bcd4a5c6b0af6a0/93dd4de5cddba2c733c65f233097f05a.js"></script></center>'
          );
        } else {
          res.writeHead(200, { "Content-Type": getType(url) });
          res.end(data);
        }
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
  console.log("Web is OK!");
});
