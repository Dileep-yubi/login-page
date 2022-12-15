import React, { useState } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import "./LoginPage.css";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    name: "",
    email: "",
    modileNo: "",
  });
  const upDateState = (property, value) => {
    let details = { ...loginDetails };
    details[`${property}`] = value;
    setLoginDetails({ ...details });
  };

  const onContinueClicked = (e) => {
    e.preventDefault();
    for (let key of Object.keys(loginDetails)) {
      if (!loginDetails[key]) return;
    }
    setLoading(true);
    const url = "https://reqres.in/api/users";
    axios
      .post(`${url}`, loginDetails)
      .then((res) => {
        e.target.reset();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            color: "#ee6047",
          }}>
          <Audio
            height="80"
            width="80"
            radius="12"
            color="#ee6047"
            ariaLabel="Loading"
          />
          <span>Registering user....</span>
        </div>
      ) : (
        <div className="loginContainer">
          <div className="loginSubContainer">
            <header className="loginLogoCintainer">
              <img
                src="https://assets.credavenue.com/logos/yubi-logo.png"
                alt="unable to load"
              />
              <div className="logoHeading">Welcome</div>
              <div className="logoDescription">
                <p>
                  Log in to Yubi to continue to All CredAvenue Applications.
                </p>
              </div>
            </header>
            <div className="inputContainer">
              <form
                onSubmit={(e) => onContinueClicked(e)}
                className="inputFormContainer">
                <input
                  className="inputTag"
                  onBlur={(e) => upDateState("name", e.currentTarget.value)}
                  type="text"
                  placeholder="Name"
                />
                <input
                  className="inputTag"
                  onBlur={(e) => upDateState("email", e.currentTarget.value)}
                  type="email"
                  placeholder="Email"
                />
                <input
                  className="inputTag"
                  onBlur={(e) => upDateState("modileNo", e.currentTarget.value)}
                  type="text"
                  placeholder="Mobile no"
                />
                <button className="inputButton" type="submit">
                  Continue
                </button>
              </form>
              <p className="infoContainer">
                Do you have an account?
                <a className="infoText" href="https://www.go-yubi.com/#">
                  Sign up
                </a>
              </p>
              <p className="infoContainer">
                Have an activation code?
                <a
                  className="infoText"
                  href="https://auth-web.credavenue.com/activate">
                  Activate now
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
