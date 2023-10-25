import slugify from 'slugify';
import ApiError from '../utilities/apiError';
import apiFeatures from '../utilities/apiFeatures';
import catchAsync from '../utilities/catchAsync';

export const getAllDocuments = (Model) => {
  return catchAsync(async (req, res, next) => {
    const documentsQuery = new apiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const documents = await documentsQuery.query;

    res.status(200).json({ status: 'success', data: documents });
  });
};

export const getDocument = (Model, options) => {
  return catchAsync(async (req, res, next) => {
    const { findBy } = options;
    const findObject = {};
    let document;
    if (!findBy) document = await Model.findById(req.params.id);
    else {
      findObject[findBy] = req.params.id;
      document = await Model.findOne(findObject);
    }

    if (!document)
      return next(new ApiError('No document found with this Id.', 404));
    res.status(200).json({ status: 'success', data: document });
  });
};

export const createDocument = (Model: any, options: any) => {
  return catchAsync(async (req, res, next) => {
    const slugId = options?.slug?.id;
    if (slugId) {
      req.body.slug = slugify(req.body[slugId], { lower: true });
    }
    const document = await Model.create(req.body);

    if (!document)
      return next(new ApiError('No document found with this Id.', 404));

    res.status(201).json({ status: 'success', data: document });
  });
};

export const deleteOneDocument = (Model) => {
  return catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document)
      return next(new ApiError('No document found with this Id.', 404));

    res.status(204).json({ status: 'success', data: null });
  });
};

export const updateOneDocument = (Model) => {
  return catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document)
      return next(new ApiError('No document found with this Id.', 404));

    res.status(200).json({ status: 'success', data: document });
  });
};
