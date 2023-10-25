import { Schema, model } from 'mongoose';
import { Product } from './product.model';

const reviewSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'Please provide your review.'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating for the review.'],
      max: [5, 'Rating should be between 1 & 5.'],
      min: [1, 'Rating should be between 1 & 5.'],
    },
    user: {
      type: Schema.ObjectId,
      required: [true, 'A review must belong to a user.'],
      ref: 'User',
    },

    product: {
      type: Schema.ObjectId,
      required: [true, 'A review must belong to product.'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name profilePicture' });
  next();
});

reviewSchema.statics.calcAverageRating = async function (productId) {
  // console.log(this.aggregate);
  const generatedStats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: productId,
        noOfRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (generatedStats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: generatedStats[0].avgRating,
      ratingsQuntity: generatedStats[0].noOfRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      rating: 4.5,
      ratingsQuntity: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();

  // console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRating(this.r.product);
});

reviewSchema.post('deleteOne', function (doc) {
  console.log('%s has been removed', doc._id);
});

const Review = model('Review', reviewSchema);

module.exports = { Review };
