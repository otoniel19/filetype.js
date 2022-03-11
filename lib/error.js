class filetype extends Error {
  constructor(obj) {
    super(obj.message);
    Object.keys(obj).forEach((o) => (this[o] = obj[o]));
    throw this;
  }
}

module.exports = filetype;
