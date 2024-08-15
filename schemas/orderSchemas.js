import Joi from "joi";

export const orderSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().email().required(),
  paymentMethod: Joi.string().valid("Cash On Delivery", "Bank").required(),
  totalAmount: Joi.number().min(0).required(),
  products: Joi.array().items(Joi.string().required()).required(),
});
