const ReplSet = require('mongodb-core').ReplSet;
var replSet = new ReplSet([{host:'localhost',port:30001}],{ha:true, haInterval: 5000, replicaSet: 'rs'});

replSet.on('connect', function replSetOnConnect(_server){
  console.log('Connected! Disconnecting in 5 seconds');
  setTimeout(function(){
    console.log('disconnecting now');
    _server.destroy();
  }, 5000);
});

replSet.connect();
