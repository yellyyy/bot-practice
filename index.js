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

      
      var paramet = request.body;
     
          switch(paramet.queryResult.intent["displayName"]){
              case 'top movies':
                    if(paramet.queryResult.parameters["top-rated"] == 'top-rated') {
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
                                  var pass = {
                                           //   speech:'Error. Can you try it again',
                                           //   displayText:'Error. Can you try it again ? '
                                                fulfillmentText: 'Error. Can you try it again ? '
                                            }            
                                  response.send(pass);
                              } else if(res.body.results.length > 0) {
                                  let result = res.body.results;
                                  let output = '';
                                  let nextline = ', ';
                                  for(let i = 0; i<result.length;i++) {
                                      output += result[i].title+nextline;
                                  } 
                                    response.setHeader('Content-Type', 'application/json');
                                    var pass = {
                                      fulfillmentText : output
                                    }   
                                    response.send(pass); 
                              }
                          });
                    }
              break;

              case 'Default Welcome Intent':
                    response.setHeader('Content-Type', 'application/json');
                    var pass = {
                                  fulfillmentText: 'Hello Im a movie bot! ask me about movies today!'
                              }            
                    response.send(pass);
              break;

              case 'Default Fallback Intent':
                    response.setHeader('Content-Type', 'application/json');
                    var pass = {
                                  fulfillmentText: 'Error. Can you try it again ? '
                              }            
                    response.send(pass);
              break;
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
