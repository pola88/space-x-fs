import "./index.scss";
import { useState, useContext } from "react";
import { isValidEmail } from "utils/email";
import { AuthContext } from "contexts/AuthContext";
import { handleError } from "utils/axios";
import { AxiosError } from "axios";

type UserFormProps = {
  onSubmit: (email: string, password: string) => Promise<string>;
  buttonText: string;
};

export const UserForm = ({ onSubmit, buttonText }: UserFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
    general: "",
  });
  const { setToken } = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await onSubmit(email, password);
      setToken(token);
    } catch (error) {
      const errorMessage = handleError(error as AxiosError);
      setError({
        email: "",
        password: "",
        general: errorMessage.error,
      });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') {
      setError( prev => ({
        ...prev,
        email: "Please enter your email",
      }));
    } else if (!isValidEmail(e.target.value)) {
      setError( prev => ({
        ...prev,
        email: "Please enter a valid email",
      }));
    } else {
      setError( prev => ({
        ...prev,
        email: "",
      }));
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') {
      setError( prev => ({
        ...prev,
        password: "Please enter your password",
      }));
    } else {
      setError( prev => ({
        ...prev,
        password: "",
      }));
    }
    setPassword(e.target.value);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input className="input" type="email" placeholder="Email" value={email} onChange={handleEmailChange} autoComplete="off" />
        {error.email && <p className="error-message">{error.email}</p>}
      </div>

      <div className="input-container">
        <input className="input" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} autoComplete="off" />
        {error.password && <p className="error-message">{error.password}</p>}
      </div>
      <button type="submit" disabled={!email || !password} className="glow-on-hover">
        {buttonText}
      </button>
      {error.general && <p className="error-message">{error.general}</p>}
    </form>
  );
};
