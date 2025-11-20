import { useContext } from "react";
import { Layout } from "components";
import { AuthContext } from "contexts/AuthContext";
import { Login, SignUp } from "pages";
import { Routes, Route } from "react-router-dom";
import ModeProvider from "./contexts/ModeContext";
import { LaunchesList } from "./containers";
import "./app.scss";

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
        {token ? (
          <Route
            path="/"
            element={
              <ModeProvider>
                <Layout>
                  <LaunchesList />
                </Layout>
              </ModeProvider>
            }
          />
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </div>
  );
}
