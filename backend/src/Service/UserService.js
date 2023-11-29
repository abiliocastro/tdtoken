import { insertUserInMongo, findUser } from "../Repository/UserRepository.js";

async function saveUser(user) {
  return insertUserInMongo(user);
}

async function searchByUser(user) {
  return findUser(user);
}

export { saveUser, searchByUser };