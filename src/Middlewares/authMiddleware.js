import { decodeToken, verifyToken } from '../Config/jwtConfig.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    verifyToken(token);
    const user = decodeToken(token);
    req.user = user.data;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};
