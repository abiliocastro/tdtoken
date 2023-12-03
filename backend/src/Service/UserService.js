import { insertUserInMongo, findUser, findByEmail, findToLoad } from "../Repository/UserRepository.js";

async function saveUser(user) {
  return insertUserInMongo(user);
}

async function searchByUser(user) {
  return findUser(user);
}

async function searchByEmail(email) {
  return findByEmail(email);
}

async function searchToLoad(email) {
  return findToLoad(email);
}

export { saveUser, searchByUser, searchByEmail, searchToLoad };