var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

var fs = require("fs");
var data = fs.readFileSync("../RecordSystem_sol_RecordSystem.abi", "utf-8");

const bodyParser = require("body-parser");
const bent = require('bent');
const formurlencoded = require('form-urlencoded');




var contract = new web3.eth.Contract(JSON.parse(data),'0x2CC92997E0A396e4Eb5D504d2D2EdEb46cA773ED');

var express = require('express')


var server = express()
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/query', function(request, response) {
  var queryRequest = new Promise((resolve, reject)=>{
    try {
       var records = contract.methods.QueryAllRecord().call()
      resolve(records);
    } catch(error){
      reject(error);
    }
  });
  queryRequest.then(records=>{
    var json={};
    var result=[];
    for(var i=0;i<records.length;i++)
    {
    	json={
    	  "name":records[i][0].toString(),
    	"in_time":records[i][1].toString(),
    	"out_time":records[i][2].toString(),
    	"fee":records[i][3].toString(),
    	"recordId":records[i][4].toString(),
    	};
    	result.push(json);
    }
    response.send(result)
  }, (error)=>{
    console.log("Error", error);
  })
});


server.post('/get',function(request, response) {
  var name = request.body.PatientName;
  var intime = request.body.In_time;
  var outtime = request.body.Out_time;
  var fee = request.body.Fee;
  console.log(request.body);
  console.log(name);
  
  request = new Promise( async(resolve, reject) => {
    try{
    	const addresses = await web3.eth.getAccounts();
      var record = await contract.methods.CreateRecord(name.toString(),intime.toString(),outtime.toString(),fee.toString()).send({from:addresses[0], gas: '1000000'});
      resolve(record);
      response.send('success!');
    }catch(error){
      reject(error);
    }
  })
});



server.post('/create',function(request, response) {
  var name = request.body.PatientName;
  var intime = request.body.In_time;
  var outtime = request.body.Out_time;
  var fee = request.body.Fee;
  console.log(request.body);
  console.log(name);
  
  request = new Promise( async(resolve, reject) => {
    try{
    	const addresses = await web3.eth.getAccounts();
      var record = await contract.methods.CreateRecord(name.toString(),intime.toString(),outtime.toString(),fee.toString()).send({from:addresses[0], gas: '1000000'});
      resolve(record);
      response.send('success!');
    }catch(error){
      reject(error);
    }
  })
  
  const data={
  PatientName:name.toString(),
  In_time:intime.toString(),
  Out_time:outtime.toString(),
  Fee:fee.toString(),
  }
  requestUrl = 'http://10.11.136.1:4040'
  console.log(formurlencoded(data));
  const headers = {"content-type": "application/x-www-form-urlencoded"};
  const post = bent(requestUrl,'POST','string');
  const res = post('/get',formurlencoded(data),headers);
  
  
});

server.post('/search', function (request, response) {

  var searchRequest = new Promise( async(resolve, reject) => {
    try{
      console.log(request.body.recordId);
      const addresses = await web3.eth.getAccounts();
      var record = await contract.methods.QueryARecord(request.body.recordId).call();
      resolve(record);
    }catch(error){
     reject(error);
  }
  });

    searchRequest.then((record)=>
  { 
    	var json={};
    	json={
    	  "name":record[0].toString(),
    	"in_time":record[1].toString(),
    	"out_time":record[2].toString(),
    	"fee":record[3].toString(),
    	"recordId":record[4].toString(),
    	};
    response.send(json);
  },error=>{
    response.status(204).send("fail");
  }
);
});




server.listen(4040)
console.log('listening 4040')
