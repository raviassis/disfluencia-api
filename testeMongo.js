const di = require('./di');
const Session = require('./models/session');
const { MongoClient,  ObjectID }= require('mongodb');
const uriMongoDb = process.env.MONGODB_URI;
(async function() {
    const repository = di.resolve('sessionRepository');
    
    // const conection = await MongoClient.connect(uriMongoDb, {useUnifiedTopology: true});
    // const result = await conection.db()
    //                 .collection("sessions")
    //                 .find({})
    //                 .toArray();
    const id = new ObjectID('5ebfef0454346a940cce43b7')
    const result = await repository.findOne({_id: id});
    console.log(result);
})();