const Joi = require("joi");

const productSchema = Joi.object({
  productName: Joi.string().min(3).max(100).required(),
  productPrice: Joi.number().positive().required(),
  productDescription: Joi.string().max(1000).allow("").required(),
  // productPicture: Joi.string().uri().allow("").optional(), // Keep commented or optional
  productCategory: Joi.string().min(3).max(50).required(),
});

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateProduct;