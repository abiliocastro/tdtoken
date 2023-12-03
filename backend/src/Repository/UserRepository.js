import client from '../Configuration/MongoConnection.js';

async function getCollection() {
  await client.connect();
  const myDB = client.db("tdtoken");
  const myColl = myDB.collection("Users");
  return myColl;
}

async function insertUserInMongo(user) {
  try {
    const myColl = await getCollection();
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
    const myColl = await getCollection();
    const result = await myColl.findOne(user);
    return result;  
  } catch (error) {
    throw error;  
  } finally {
    await client.close();
  }
} 

async function findByEmail(email) {
  try {
    const myColl = await getCollection();
    const result = await myColl.findOne({
      "email": email
    });
    return result;  
  } catch (error) {
    throw error; 
  } finally {
    await client.close();
  }
}

async function findToLoad(email) {
  try {
    await client.connect();
    const myDB = client.db("tdtoken");
    const myColl = myDB.collection("Users");
    const result = await myColl.findOne({
      "email": email
    }, {
      projection: { password: 0 }
    });
    return result;  
  } catch (error) {
    throw error; 
  } finally {
    await client.close();
  }
}

async function findUserRealBalance(email) {
  try {
    await client.connect();
    const myDB = client.db("tdtoken");
    const myColl = myDB.collection("Users");
    const user = await myColl.findOne({
      "email": email
    }, {
      projection: { realBalance: 1 }
    });
    return user.realBalance;  
  } catch (error) {
    throw error; 
  } finally {
    await client.close();
  }
}

export { insertUserInMongo, findUser, findByEmail, findToLoad, findUserRealBalance };