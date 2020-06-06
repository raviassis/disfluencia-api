const { ObjectID } = require('mongodb');
module.exports = class BaseRepository {
  constructor(collection, uri, dbClient) {
    this.collection = collection;
    this.uri = uri;
    this.dbClient = dbClient;
    this.options = { useUnifiedTopology: true };
  }

  // Should be overrided to correctly mapping
  _mapResultToModel(result) {
    return result;
  }

  async insertOne(obj) {
    const conection = await this.dbClient.connect(this.uri, this.options);
    const result = (await conection.db().collection(this.collection).insertOne(obj)).ops[0];
    conection.close();
    return this._mapResultToModel(result);
  }

  async deleteOne(obj) {
    const _id = new ObjectID(obj);
    const conection = await this.dbClient.connect(this.uri, this.options);
    const result = await conection.db().collection(this.collection).deleteOne({ _id });
    conection.close();
    return this._mapResultToModel(result);
  }

  async updateOne(obj) {
    const conection = await this.dbClient.connect(this.uri, this.options);
    const result = (
      await conection
        .db()
        .collection(this.collection)
        .replaceOne({ _id: new ObjectID(obj._id) }, obj)
    ).ops[0];
    return this._mapResultToModel(result);
  }

  async findOne(query) {
    const conection = await this.dbClient.connect(this.uri, this.options);
    const result = await conection.db().collection(this.collection).findOne(query);
    conection.close();
    return this._mapResultToModel(result);
  }

  async createCollection() {
    const conection = await this.dbClient.connect(this.uri, this.options);
    await conection.db().createCollection(this.collection);
    conection.close();
  }

  async findMany(query) {
    const conection = await this.dbClient.connect(this.uri, this.options);
    const result = await conection.db().collection(this.collection).find(query).toArray();
    conection.close();
    return result.map(this._mapResultToModel);
  }

  async findById(id) {
    const _id = new ObjectID(id);
    return await this.findOne({ _id });
  }
};
