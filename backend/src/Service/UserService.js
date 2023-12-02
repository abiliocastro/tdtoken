import { insertUserInMongo, findUser, findByEmail } from "../Repository/UserRepository.js";

async function saveUser(user) {
  return insertUserInMongo(user);
}

async function searchByUser(user) {
  return findUser(user);
}

async function searchByEmail(email) {
  return findByEmail(email);
}

export { saveUser, searchByUser, searchByEmail };