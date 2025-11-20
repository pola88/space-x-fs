import { createUser, validateUserAndPassword } from "../services/admin";

export const generateToken = async (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const email = req.body.email;
  const password = req.body.password;

  if (!jwtSecretKey) {
    return res.status(400).send({ error: "JWT Secret not set" });
  }

  if (!email || !password) {
    return res.status(400).send({ error: "Email or password not set" });
  }

  try {
    const { token } = await validateUserAndPassword(email, password);
    return res.status(201).send({ token });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  } 
};

export const signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const { user, token } = await createUser(email, password);
    return res.status(201).send({ token });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
  
};
