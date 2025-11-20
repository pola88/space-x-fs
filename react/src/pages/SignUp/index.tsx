import "./index.scss";
import { signup } from "api";
import { UserForm } from "components/UserForm";

export const SignUp = () => {
  const handleSignup = async (email: string, password: string) => {
    const response = await signup(email, password);
    return response.token;
  };
  return (
    <div className="signup-page">
      <img
        src="https://www.deptagency.com/wp-content/themes/dept/public/logo-light-new.svg"
        alt="DEPT®"
        title="DEPT®"
      />
      <UserForm onSubmit={handleSignup} buttonText="Sign up" />
    </div>
  );
};
