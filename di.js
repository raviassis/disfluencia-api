const awilix = require('awilix');
const MongoClient = require('mongodb').MongoClient;
const uriMongoDb = process.env.MONGODB_URI;

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    uriDb: awilix.asValue(uriMongoDb),
    dbClient: awilix.asValue(MongoClient),
});

container.loadModules(
    [
        'repositories/*.js',
        'controllers/*.js',
    ],
    {
        formatName: "camelCase",
        resolverOptions: {
            lifetime: awilix.Lifetime.TRANSIENT,
        }
    },
);

module.exports = container;