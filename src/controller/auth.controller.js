import User from "../model/usuario.model.js";
import bcrypt from "bcryptjs";
import { redis } from "../services/redis.service.js";
import crypto from "crypto";
import { generateToken } from "../services/token.service.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ msg: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    // Generar OTP de 6 dígitos
    const otp = crypto.randomInt(100000, 999999).toString();

    // Guardar OTP en Redis por 5 minutos
    await redis.setEx(`otp:${username}`, 300, otp);

    console.log(`OTP para ${username}: ${otp}`);

    return res.json({ msg: "OTP enviada al correo" });

  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Error en login" });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { username, otp } = req.body;

    const storedOtp = await redis.get(`otp:${username}`);

    if (!storedOtp) {
      return res.status(401).json({ msg: "OTP expirada" });
    }

    if (storedOtp !== otp) {
      return res.status(401).json({ msg: "OTP incorrecta" });
    }

    await redis.del(`otp:${username}`);

    const user = await User.findOne({ username });

    const token = generateToken({
      id: user._id,
      username: user.username
    });

    return res.json({
      msg: "OTP validada",
      token,
      user
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Error verificando OTP" });
  }
};
