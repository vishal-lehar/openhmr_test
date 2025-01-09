// const mysql = require('mysql2/promise');
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'user',
  password: 'userpassword',
  database: 'testdb',
  port:3306
};

// Function to create a connection
async function getConnection() {
  return mysql.createConnection(dbConfig);
}

// Utility to execute queries
async function executeQuery(query, params = []) {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(query, params);
    return results;
  } finally {
    await connection.end();
  }
}

module.exports = { executeQuery };