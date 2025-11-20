import { generateToken, signup } from "../controllers/admin";

export default (router) => {
  router.post("/admin/token", generateToken);
  router.post("/admin/signup", signup);
};
