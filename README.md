# mongodb-native-driver-replset-bug

mongodb-native-driver 2.0.3 replSet bug
this bug also affects [mongodb package version 2.2](https://github.com/mongodb/node-mongodb-native/tree/2.2)


#### Run 3 mongod instances

    for N in {0,1,2};do mkdir /tmp/db$N; done
    for N in {0,1,2};do mongod --port 3000$N --dbpath /tmp/db$N --replSet rsSample --smallfiles --logpath /tmp/db$N/mongodb.log --fork; done

#### Configure a ReplicaSet with those 3 instances

    mongo --port 30000 -e "rs.initiate();"
    mongo --port 30000 --eval "rs.add('$HOSTNAME:30001')"
    mongo --port 30000 --eval "rs.add('$HOSTNAME:30002')"
  

#### Check the status of the replica set

    mongo --host rsSample/localhost --port 30000 --eval 'rs.status()'

#### Clone this repo and enter the repo's directory

    git clone https://github.com/danielsan/mongodb-core-replset-bug.git
    cd mongodb-core-replset-bug

#### Checkout branch 1.3.21, install dependencies and run sample code

    git checkout 1.3.21
    npm install
    npm start # or just "node index.js"

The expected output is:

    Connected! Disconnecting in 5 seconds
    disconnecting now

That means this version of the driver is working connecting to a Replica Set

#### Checkout branch 2.03, install dependencies and run sample code

    git checkout 2.0.3
    npm install
    npm start # or just "node index.js"

The results should be the same if it a bug was not there but instead what one sees is this:

    events.js:141
      throw er; // Unhandled 'error' event
      ^
    MongoError: no valid replicaset members found
      at null.<anonymous> (/home/daniel/Projects/Daniel/mongodb-core-replset-bug/node_modules/mongodb-core/lib/topologies/replset.js:425:33)
      at Timer.listOnTimeout (timers.js:92:15)
