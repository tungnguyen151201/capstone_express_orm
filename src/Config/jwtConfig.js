import jwt from "jsonwebtoken";

const key = process.env.SECRET_KEY;

export const createToken = (data) => {
  return jwt.sign({ data }, key, { expiresIn: "5m" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, key);
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
