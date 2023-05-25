import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function LogInModal(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there is a token stored in the localStorage
    const token = localStorage.getItem("jwt-token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if a token exists, otherwise set it to false
  }, []);

  const handleLogin = async () => {
    try {
      const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!resp.ok) throw Error("There was a problem in the login request");

      if (resp.status === 401) {
        throw new Error("Invalid credentials");
      } else if (resp.status === 400) {
        throw new Error("Invalid email or password format");
      } else if (resp.status === 200) {
        const data = await resp.json();
        localStorage.setItem("jwt-token", data.token);
        setIsLoggedIn(true);
        navigate(`/profile`);
        props.onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    setUser({ email: "", password: "" });
    setIsLoggedIn(false); // Set isLoggedIn to false
    navigate(`/`);
  };

  const handleModalClick = (event) => {
    // Prevent click events from propagating to the backdrop
    event.stopPropagation();
  };

  return (
    <div className="custom-backdrop fade show " onClick={props.onClose}>
      <div className="modal-dialog " onClick={handleModalClick}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Log In</h5>
            <button
              type="button"
              className="btn-close btn-close-dark"
              onClick={props.onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row d-flex justify-content-center">
              <div className="col-md-10">
                <h4 className="mb-3 fw-normal">Email</h4>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                  <label htmlFor="floatingInput">Email</label>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-md-10">
                <h4 className="mb-3 fw-normal">Password</h4>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control form-control-lg outline-dark"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {isLoggedIn ? (
              // Render logout button if user is logged in
              <div className="col-md-2 mt-2 mt-md-0">
                <button
                  className="w-100 btn btn-sm btn-outline-dark"
                  type="submit"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </button>
              </div>
            ) : (
              // Render login button if user is not logged in
              <div className="col-md-2 mt-2 mt-md-0">
                <button
                  className="w-100 btn btn-sm btn-outline-dark"
                  type="submit"
                  onClick={() => handleLogin()}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInModal;
