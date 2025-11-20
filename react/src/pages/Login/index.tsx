import "./index.scss";
import { login } from "api";
import { Link } from "react-router-dom";
import { UserForm } from "components/UserForm";

export const Login = () => {
  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    return response.token;
  };
  return (
    <div className="login-page">
      <img
        src="https://www.deptagency.com/wp-content/themes/dept/public/logo-light-new.svg"
        alt="DEPT®"
        title="DEPT®"
      />
      <UserForm onSubmit={handleLogin} buttonText="Log in" />
      
      <Link to="/signup">Sign up</Link>
    </div>
  );
};
