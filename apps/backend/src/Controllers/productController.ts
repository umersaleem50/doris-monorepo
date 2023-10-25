import catchAsync from '../utilities/catchAsync';
import { Product } from '@org/db-models';

import {
  createDocument,
  deleteOneDocument,
  getAllDocuments,
  getDocument,
  updateOneDocument,
} from './handlerFactory';

export const getAllProducts = getAllDocuments(Product);
export const getProduct = getDocument(Product, {
  // findBy: 'id',
});

export const createProduct = createDocument(Product, {
  slug: { id: 'name' },
});

export const updateOne = updateOneDocument(Product);
export const deleteOne = deleteOneDocument(Product);

export const getProductName = catchAsync(async (req, res, next) => {
  const { name } = await Product.findById(req.params.id);
  console.log('this is name', name);
  req.product.name = name;
  next();
});
