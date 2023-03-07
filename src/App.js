import react, { useState, useEffect, useRef } from "react";
import "./App.css";
import Keycloak from "keycloak-js";
import Home from "../src/components/Home.js";

function App() {
  const [token, setToken] = useState(null);

  let isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;
    let initOptions = {
      url: process.env.REACT_APP_KEYCLOAK_URL,
      realm: process.env.REACT_APP_KEYCLOAK_REALM,
      clientId: process.env.REACT_APP_KEYCLOAK_CLIENT,
    };

    let keycloak = Keycloak(initOptions);

    keycloak
      .init({ onLoad: "login-required" })
      .then((auth) => {
        if (!auth) {
          window.location.reload();
        } else {
          // setToken(keycloak.token);
          console.info("Authenticated");
        }

        //React Render
        // console.log(keycloak.token);
        localStorage.setItem("react-token", keycloak.token);
      })
      .catch(() => {
        console.error("Authenticated Failed");
      });
  }, []);

  return (
    <>
      {/* <h1>hello</h1> */}
      <Home />
    </>
  );
}

export default App;
