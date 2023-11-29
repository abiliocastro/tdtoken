import insertUserInMongo from "../Repository/UserRepository.js";

async function saveUser(user) {
  return insertUserInMongo(user);
}

export default saveUser;