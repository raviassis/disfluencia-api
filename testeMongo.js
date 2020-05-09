const di = require('./di');
const Session = require('./models/session');
const MongoClient = require('mongodb').MongoClient;
const uriMongoDb = process.env.MONGODB_URI;
(async function() {
    const repository = di.resolve('sessionRepository');
    const session = new Session(
        {
            name: 'testeSession',
            annotation: 'annotation',
            transcription: {
                intelligentSegment: 12,
                therapistInterruption: 15,
                hesitation: 16,
                respite: 8,
                block: 7,
                extension: 6,
                wordIntrusion: 5,
            }
        }
    );
    
    const conection = await MongoClient.connect(uriMongoDb, {useUnifiedTopology: true});
    const result = (await conection.db()
                    .collection("session")
                    .insertOne(session)).ops[0];
    console.log(result);

    // const result = await repository.insertOne(session);
    // console.log(result.name);
})();