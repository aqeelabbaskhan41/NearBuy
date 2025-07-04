const Joi = require("joi");

const signupSchema = Joi.object({
  business_name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  business_address: Joi.string().min(6).max(500),
  location: Joi.array()
    .length(2)
    .items(
      Joi.number().min(-180).max(180).required(), // longitude
      Joi.number().min(-90).max(90).required() // latitude
    )
    .required(),
  phone_number: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  buisness_catagory: Joi.string().min(3).max(20).required(),
  business_description: Joi.string().min(10).max(1000),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

const vendorSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); // Better message
    }
    next();
};

const vendorLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


module.exports ={
    vendorSignup,
    vendorLogin
}
