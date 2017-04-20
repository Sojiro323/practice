var http = require('http'),
    fs = require('fs'),
    qs = require('querystring'),
port = 8888;
host = '192.168.33.10';
var server = http.createServer();

function emoji(res,data,query){
  smile = "😆";
  var len = query.name.length;
  moji = new Array(len+1).join(smile);
  res.writeHead(200,{'Content-Type' : 'text/html'});
  res.write(data);
  res.write(moji);
  res.end();
}


server.on('request',function(req,res){
  fs.readFile(__dirname + '/practice.html','utf-8',function(err,data){
    if(err){
      res.writeHead(404,{'Content-Type':'text/plain'});
      res.write("not found!");
      return res.end();
    }

    if (req.url = '/postpage' && req.method === 'POST'){
      poststring = "";
      req.on("readable",function(){
        poststring += req.read();
      });
      req.on("end",function(){
        var query = qs.parse(poststring);
        emoji(res,data,query);
    });
    }else{
      res.writeHead(200,{'Content-Type' : 'text/html'});
      res.write(data);
      res.end();
    }
  });
});

server.listen(port , host);
console.log("server listening...");
