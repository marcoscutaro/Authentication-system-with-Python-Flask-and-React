import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import LogInModal from "./LogInModal";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import "../../styles/header.css";

const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleLogInModalClose = () => {
    setShowLogInModal(false);
  };

  const handleRegisterButtonClick = () => {
    setShowModal(true);
  };
  const handleLogInButtonClick = () => {
    setShowLogInModal(true);
  };
  return (
    <div className="bg-nav header">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link to={`/`}>
          <button className="btn px-2  fw-bold fs-3">log inout</button>
        </Link>

        {!store.user.id ? (
          <>
            <div className="col-1 m-3">
              <button
                type="button"
                className="btn btn btn-outline-dark btn-lg px-4  gap-3"
                onClick={handleLogInButtonClick}
              >
                Login
              </button>
              {showLogInModal && <LogInModal onClose={handleLogInModalClose} />}
            </div>
            <div>
              <button
                type="button"
                className="btn btn-outline-dark btn-lg px-4 gap-3"
                onClick={handleRegisterButtonClick}
              >
                Register
              </button>

              {showModal && <RegisterModal onClose={handleModalClose} />}
            </div>
          </>
        ) : (
          <div className="dropdown text-end">
            <a
              style={{ color: "#000" }}
              href="#"
              className="d-block text-decoration-none dropdown-toggle "
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                alt="mdo"
                src={store.user.avatar}
                width="40"
                height="40"
                className="rounded-circle "
              />
            </a>
            <ul
              className="dropdown-menu text-small shadow-sm"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <Link to={`/profile`}>
                  <button className="btn px-2  ">Profile</button>
                </Link>
              </li>
              <li>
                <Link to={`/favorites`}>
                  <button className="btn px-2  ">Favorites</button>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="btn px-2  "
                  onClick={async () => {
                    await actions.logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
