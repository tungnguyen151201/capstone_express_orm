import { decodeToken } from "../Config/jwtConfig.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = decodeToken(token);
    req.user = user.data;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource!" });
  }
};
