const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.Host,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});
connection.connect((err) => {
  if (err) {
    console.log(err.messsage);
  }
  console.log('db' + connection.state);
});
class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = 'SELECT * FROM names;';
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      //console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async insertNewName(name) {
    try {
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query = 'Insert INTO names (name,date_added) VALUES(?,?);'; //(?,?) stops sqll injection the two ? relate to name dateAdded params on next line
        connection.query(query, [name, dateAdded], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });
      console.log(insertId);
      return {
        id: insertId,
        name: name,
        dateAdded: dateAdded,
      };
      //return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRowById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = 'DELETE FROM names WHERE id = ?';
        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      //console.log(response);
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false; //incase code breaks
    }
  }

  async updateNameById(id, name) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = 'UPDATE names SET name = ? WHERE id = ?';
        connection.query(query, [name, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });
      //console.log(response);
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false; //incase code breaks
    }
  }
  async searchByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = 'SELECT * FROM names WHERE name = ?;';
        connection.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = DbService;
