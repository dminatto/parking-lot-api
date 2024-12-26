import * as mongoose from 'mongoose';

class Database{

    private dbUrl: string = process.env.DB_CONN_STRING as string;

    constructor(){}

    async createConnection(){
      try {
        await mongoose.connect(this.dbUrl);
        console.log("Connected to the db");
      } catch (err) {
          console.error("Failed to connect to the db", err);
      }
    }
}

export default Database;
