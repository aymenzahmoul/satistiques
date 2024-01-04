import React, { useState } from "react";
import "./LoginForm.css";
import images from "../../assets/images/logo.png"
import { Alert } from 'react-bootstrap';
import AuthService from "../../service/AuthService";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [test, setTest] = useState('true');
  const [loginData, setLoginData] = useState({
    Login: "",
    Password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const newErrors = {};
    if (loginData.Login.trim() === '') {
      newErrors.Login = 'Le champ Nom d\'utilisateur ne peut pas être vide.';
    }
    if (loginData.Password.trim() === '') {
      newErrors.Password = 'Le champ Mot de passe ne peut pas être vide.';
    }

    // Si des erreurs sont détectées, mettez à jour l'état des erreurs
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await AuthService.signin(loginData);

        if (response.success) {
          console.log("Authentication successful");
          

          navigate("/");
          window.location.reload();
        } else {
          console.error("Authentication failed");
          console.log(loginData);
          setErrorMessage('Please enter your username and password.');
          setTest('false')
          
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage('Please enter your username and password.');
        setTest('false')
      }
    }
  };

  const [errors, setErrors] = useState({
    Login: '',
    Password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    // Réinitialisez les erreurs lorsque l'utilisateur commence à taper dans un champ
    setErrors({
      ...errors,
      [name]: '',
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
                src={images}
                className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px"
                alt="profile"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className={`form-control ${errors.Login && 'is-invalid'}`}
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
                c className={`form-control ${errors.Password && 'is-invalid'}`}
                id="password"
                placeholder="password"
                name="Password"
                value={loginData.Password}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit"  className="btn btn-color px-5 mb-5 w-100"  style={{ backgroundColor: '#339af0', color: '#ffffff' }}onClick={handleLogin}>
                Login
              </button>
            </div>      {(test=== 'false') ?(
      <Alert variant="warning">
      {errorMessage}
    </Alert>
              ) :(
                ''
              )}
           
      
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginForm;
