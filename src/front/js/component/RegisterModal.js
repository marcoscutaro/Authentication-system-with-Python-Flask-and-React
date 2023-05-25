import React, { useState } from "react";

function RegisterModal(props) {
  const [user, setUser] = useState({ email: "", password: "" });

  const registerUser = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      // Registration successful, close the modal
      props.onClose();
    }
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
            <h5 className="modal-title">Register</h5>
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
            <div className="col-md-2 mt-2 mt-md-0">
              <button
                className="w-100 btn btn-sm btn-outline-dark"
                type="submit"
                onClick={() => registerUser()}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
