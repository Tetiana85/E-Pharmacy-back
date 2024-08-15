import { Order } from "../db/orders.js";
import { Products } from "../db/products.js";
import { User } from "../db/user.js";

import HttpError from "../helpers/HttpError.js";
import RegisterHttpError from "../helpers/RegisterHttpError.js";
import { orderSchema } from "../schemas/orderSchemas.js";

export const getCart = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw HttpError(404, "User not found");
    }

    res.status(200).json(user.cart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { productId, quantity } = req.body;

    const product = await Products.findById(productId);
    if (!product) {
      throw HttpError(404, "Product not found");
    }

    const cartItemIndex = user.cart.findIndex((item) =>
      item.productId.equals(productId)
    );
    if (cartItemIndex >= 0) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    next(error);
  }
};

export const removeToCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = req.user;
    user.cart = user.cart.filter((item) => item.productId.toString() !== id);

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    next(error);
  }
};

export const addToOrders = async (req, res, next) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) throw RegisterHttpError(error);
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).json("Order successfully added");
  } catch (error) {
    next(error);
  }
};

// export const addToOrders = async (req, res, next) => {
//   try {
//     console.log("Received order data:", req.body); // Логируем данные, которые приходят в контроллер
//     const { error } = orderSchema.validate(req.body);
//     if (error) {
//       console.log("Validation error:", error.details); // Логируем ошибку валидации
//       return res.status(400).json({ error: error.details }); // Возвращаем ошибку валидации
//     }

//     const newOrder = new Order(req.body);
//     await newOrder.save();
//     console.log("Order successfully saved to database."); // Логируем успешное сохранение

//     res.status(200).json("Order successfully added");
//   } catch (error) {
//     console.error("Error adding order:", error); // Логируем ошибку
//     next(error);
//   }
// };

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, { cart: [] });

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
