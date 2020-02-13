class MongooseRepository {
  constructor({model}) {
    this.collection = model;
  }
  async count() {
    return this.collection.estimatedDocumentCount();
  }

  async find(query = {}, { multiple = true, count, lean } = {}) {
    const results = multiple
      ? this.collection.find(query)
      : this.collection.findOne(query);

    if (count) {
      return results.countDocuments().exec();
    } else if (lean) {
      return results.lean().exec();
    } else {
      return results.exec();
    }
  }

  async create(body) {
    const document = new this.collection(body);

    return document.save();
  }

  async update(document, body = {}) {
    const id = typeof document._id !== "undefined" ? document._id : document;

    return this.collection.findByIdAndUpdate(id, body, { new: true });
  }

  async remove(document) {
    return this.collection.findByIdAndRemove(document);
  }
}

module.exports = MongooseRepository;