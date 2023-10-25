import { Schema, model, models } from 'mongoose';
const crypto = require('crypto');

const productSchema = new Schema(
  {
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be between 1 - 5'],
      max: [5, 'Rating must be between 1 - 5'],
    },

    ratingsQuntity: {
      type: Number,
    },

    images: { type: [String], required: [true, 'A product must have images.'] },
    // images: [String],

    name: {
      type: String,
      unique: true,
      required: [true, 'A product must have a name'],
      minlength: [
        8,
        'Product name is too short. It should contain more than 8 characters.',
      ],
      maxlength: [
        64,
        'Product name is too long. It should contain less than 64 characters.',
      ],
    },

    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [1000, 'A product price must be greater than 1000.'],
      max: [25000, 'A product price must be less than 25000.'],
    },
    discount: {
      type: Number,
      validate: {
        validator: function (val) {
          return this.price > val;
        },
        message: 'Discount must be less then actual price.',
      },
    },

    productCode: {
      type: String,
      default: crypto.randomBytes(3).toString('hex'),
      uppercase: true,
    },

    sizes: {
      type: [String],
      required: [true, 'Product must have atleast 1 size'],
      enum: {
        values: ['xs', 's', 'm', 'l', 'xl'],
        message: 'Please choose a valid size between xs, s, m, l or xl',
      },
    },

    productDetail: {
      type: String,
      required: [true, 'Please explain about the product in brief.'],
      maxlength: [300, 'Product description must be less than 300 characters.'],
    },

    modelHeight: {
      type: Number,
      min: [100, 'Height of model should be greater than 100cm.'],
      max: [250, 'Height of model should be less than 250cm.'],
    },

    modelWear: {
      type: String,
      enum: {
        values: ['xs', 's', 'm', 'l', 'xl'],
        message: 'Please choose a valid size between xs, s, m, l or xl',
      },
    },

    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
      },
    ],

    stocks: {
      type: Number,
    },
    //
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// productSchema.virtual("reviews", {
//   ref: "Reviews",
//   foreignField: "product",
//   localField: "_id",
// });

productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
});

// productSchema.pre(/^findOne/, function (next) {
//   // this.populate('reviews');
//   next();
// });

export const Product = models['Product'] || model('Product', productSchema);

module.exports = { Product };
