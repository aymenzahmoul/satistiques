import React, { useState } from "react";
import "./LoginForm.css";

import AuthService from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Resister = () => {
  const [loginData, setLoginData] = useState({
    Login: "",
    Password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loginData.Login !== "" && loginData.Password !== "") {
      try {
        const response = await AuthService.signin(loginData);

        if (response.success) {
          console.log("Authentication successful");

          navigate("/");
          window.location.reload();
        } else {
          console.error("Authentication failed");
          console.log(loginData);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setLoginData({
      ...loginData,
      [e.target.name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here using the 'username' and 'password' states
  };
  return (
    // <div className="container">
    //   <div className="img">
    //     <img src={backgroundImg} alt="background" />
    //   </div>
    //   <div className="login-content">
    //     <div className="form">
    //       <img src={avatarImg} alt="avatar" />
    //       <div className="input-div one">
    //         <div className="i">
    //           <i className="fas fa-user"></i>
    //         </div>
    //         <div className="div">
    //           <input
    //             placeholder="Username"
    //             className="input"
    //             name="Login"
    //             value={loginData.Login}
    //             onChange={handleChange}
    //           />
    //         </div>
    //       </div>
    //       <div className="input-div pass">
    //         <div className="i">
    //           <i className="fas fa-lock"></i>
    //         </div>
    //         <div className="div">
    //           <input
    //             placeholder="Password"
    //             type="password"
    //             className="input"
    //             name="Password"
    //             value={loginData.Password}
    //             onChange={handleChange}
    //           />
    //         </div>
    //       </div>
    //       <button type="button" className="btn" onClick={handleLogin}>
    //         Login
    //       </button>
    //     </div>
    //   </div>
    //   <img className="wave" src={waveImg} alt="wave" />
    // </div>
    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
       
        <div className="card my-5">
          <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>
            <div className="text-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px"
                alt="profile"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="Username"
                aria-describedby="emailHelp"
                placeholder="User Name"
                name="Login"
                value={loginData.Login}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                name="Password"
                value={loginData.Password}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-color px-5 mb-5 w-100" onClick={handleLogin}>
                Login
              </button>
            </div>
            <div id="emailHelp" className="form-text text-center mb-5 text-dark">
               <Link to="/" className="text-dark fw-bold"> Créer un compte</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Resister;
