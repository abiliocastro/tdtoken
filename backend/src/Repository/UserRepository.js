import client from '../Configuration/MongoConnection.js';

const myDB = client.db("tdtoken");

async function insertUserInMongo(user) {
  const myColl = myDB.collection("User");
  try {
    const result = await myColl.insertOne(user);
    console.log(
      `User created with the _id: ${result.insertedId}`,
    );
    return result;  
  } catch (error) {
    throw error;  
  }
} 

export default insertUserInMongo;