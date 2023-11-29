import client from '../Configuration/MongoConnection.js';

async function insertUserInMongo(user) {
  try {
    await client.connect();
    const myDB = client.db("tdtoken");
    const myColl = myDB.collection("Users");
    const result = await myColl.insertOne(user);
    console.log(
      `User created with the _id: ${result.insertedId}`,
    );
    return result;  
  } catch (error) {
    throw error;  
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
} 

async function findUser(user) {
  try {
    await client.connect();
    const myDB = client.db("tdtoken");
    const myColl = myDB.collection("Users");
    const result = await myColl.findOne(user);
    return result;  
  } catch (error) {
    throw error;  
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
} 

export { insertUserInMongo, findUser };