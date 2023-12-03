class NotKeyHolderError extends Error {
  constructor(message) {
      super(message);
      this.name = "KeyAlreadyBindedInvalid";
  }
}

export { NotKeyHolderError }