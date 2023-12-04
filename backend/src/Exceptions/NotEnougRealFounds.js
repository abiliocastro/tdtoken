class NotEnougRealFounds extends Error {
  constructor(message) {
      super(message);
      this.name = "NotEnougRealFounds";
  }
}

export { NotEnougRealFounds }