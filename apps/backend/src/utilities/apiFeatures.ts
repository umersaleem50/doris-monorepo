export default class apiFeatures {
  model: any;
  query: any;
  sortQuery: any;
  fields: any;
  limit: any;
  page: any;
  constructor(Model, Query) {
    this.model = Model;
    this.query = Query;
    this.sortQuery = Query.sort;
    this.fields = Query.fields;
    this.limit = Query.limit;
    this.page = Query.page;
  }
  filter() {
    const queryObj = { ...this.query };
    const excluded = ['sort', 'limit', 'page', 'fields'];
    excluded.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.model.find(JSON.parse(queryStr));

    return this;
  }
  sort() {
    if (this.sortQuery) {
      this.model.sort(this.sortQuery.split(',').join(' '));
    }
    return this;
  }
  limitFields() {
    if (this.fields) {
      this.model.select(this.fields.split(',').join(' '));
    }
    return this;
  }
  pagination() {
    if (!this.page || this.page < 1) return this;
    const limit = this.limit || 100;
    const skip = (this.page - 1) * limit;
    this.model.limit(limit);
    this.model.skip(skip);
    return this;
  }
}
