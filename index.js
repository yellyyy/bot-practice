'use strict';

var restify = require('restify');
const bodyParser = require('body-parser');
const http = require('https');
var unirest = require("unirest");
let errorResposne = {
  results: []
};
var port = process.env.PORT || 8080;

var server = restify.createServer();

server.use(bodyParser.json());
try{
  
    server.post('/getMovies',function (request,response)  { 

        if(request.body.result.parameters['top-rated']) {
            var req = unirest("GET", "https://api.themoviedb.org/3/movie/top_rated");
                req.query({
                    "page": "1",
                    "language": "en-US",
                    "api_key": "736b1708b6070979b841db357f52d2cb"
                });
                req.send("{}");
                req.end(function(res) {
                    if(res.error) {
                        response.setHeader('Content-Type', 'application/json');
                        response.send(JSON.stringify({
                            "speech" : "Error. Can you try it again ? ",
                            "displayText" : "Error. Can you try it again ? "
                        }));
                    } else if(res.body.results.length > 0) {
                        let result = res.body.results;
                        let output = '';
                        for(let i = 0; i<result.length;i++) {
                            output += result[i].title;
                            output+="\n"
                        }
                        response.setHeader('Content-Type', 'application/json');
                        response.send(JSON.stringify({
                            "speech" : output,
                            "displayText" : output
                        })); 
                    }
                });
        }
     
    });


    server.get('/getName',function (req,res){
      res.send('Swarup Bam');
  });
  }catch(err){
      console.log(err);
  }

server.listen(port, function () {
  console.log("Server is up and running...");
});

/*
server.get('/name',function (req,res,next){
  res.send('Swarup Bam');
  next();
});*/
