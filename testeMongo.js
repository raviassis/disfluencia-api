const di = require('./di');
const Session = require('./models/session');
const { MongoClient,  ObjectID }= require('mongodb');
const uriMongoDb = process.env.MONGODB_URI;
(async function() {
    const repository = di.resolve('sessionRepository');
    
    const id = new ObjectID('5ebfef0454346a940cce43b7');

    const conection = await MongoClient.connect(uriMongoDb, {useUnifiedTopology: true});
    // const result = await conection.db()
    //                 .collection("sessions")
    //                 .replaceOne({_id: id}, {name: 'testeReplace'}, {}, (err, result) => {
    //                     if (err) throw err;
    //                     console.log(result.ops);
    //                 });
    
    const result = await repository.findOne({_id: id});
    console.log(result);
    result.name = "edited1";
    const edited = await repository.updateOne(result);
    console.log(edited);
})();