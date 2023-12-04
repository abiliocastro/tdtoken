import client from '../Configuration/MongoConnection.js';
import { ObjectId } from 'mongodb';

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
    const myColl = await getCollection();
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

async function updateWhenBuyTokens(email, newBalance, transaction) {
  try {
    await client.connect();
    const myDB = client.db("tdtoken");
    const myColl = myDB.collection("Users");
    transaction._id = new ObjectId();
    await myColl.findOneAndUpdate({
      "email": email
    }, {
      "$set": { "realBalance": newBalance },
      "$push": { "transactions": transaction },
    });
    return transaction._id;  
  } catch (error) {
    throw error; 
  } finally {
    await client.close();
  }
}

async function findUserTransaction(id, email) {
  try {
    await client.connect();
    const myDB = client.db("tdtoken");
    const myColl = myDB.collection("Users");
    const agg = [
      {
        '$match': {
          'email': email
        }
      }, {
        '$unwind': {
          'path': '$transactions', 
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$match': {
          'transactions._id': new ObjectId(id)
        }
      }
    ];
    const cursor = myColl.aggregate(agg);
    const result = await cursor.toArray();
    if(result) {
      return result[0].transactions;
    }
    return result;  
  } catch (error) {
    throw error; 
  } finally {
    await client.close();
  }  
}

export { insertUserInMongo, findUser, findByEmail, findToLoad, findUserRealBalance, updateWhenBuyTokens, findUserTransaction };