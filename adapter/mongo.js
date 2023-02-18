const { MongoClient } = require("mongodb");
const connectionString = "mongodb://localhost/rds_information?retryWrites=true&w=majority";

class Mongo extends MongoClient {
  constructor() {
    super(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  makeConnection(model, kollection) {
    return new Promise(async (resolve, reject) => {
      this.connect((err) => {
        if (err) {
          reject(err)
        }
        try {
          const db = this.db(model);
          const koll = db.collection(kollection);  
          resolve(koll);
        }
        catch(err) {
          console.log(err)
          reject(err);
        }
      });
    });
  }

  async write(document, dbase, col) {
    return new Promise(async (resolve, reject) => {
      this.makeConnection(dbase, col).then((collection) => {
        collection.insertOne(document, (err, res) => {
          if (err) {
            reject(err);
          }
  
          resolve(res.insertedId.toHexString());
        });
      }).catch((err) => {
        reject(err);
      })
    });
  }

  async read(dbase, col) {
    return new Promise(async(resolve, reject) => {
      this.makeConnection(dbase, col).then((collection) => {
        resolve(collection.find({}).sort({dateTime: -1}).toArray());
      }).catch(err => {
        reject(err);
      })
    })
  }

  async readByColumn(dbase, col, query) {
    return new Promise(async(resolve, reject) => {
      this.makeConnection(dbase, col).then(collect => {
        resolve(collect.find(query).toArray())
      }).catch(err => reject(err))
    })
  }
}

module.exports = Mongo;


// module.exports = insertDoument;
