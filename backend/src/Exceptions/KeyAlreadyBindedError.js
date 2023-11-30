class KeyAlreadyBindedError extends Error {
  constructor(message) {
      super(message);
      this.name = "KeyAlreadyBinded";
  }
}

class KeyAlreadyBindedErrorInvalid extends Error {
  constructor(message) {
      super(message + " Invalid");
      this.name = "KeyAlreadyBindedInvalid";
  }
}

export { KeyAlreadyBindedError, KeyAlreadyBindedErrorInvalid }