import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ msg: "Token requerido" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // guardar user para otras rutas
    next();

  } catch (e) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};
