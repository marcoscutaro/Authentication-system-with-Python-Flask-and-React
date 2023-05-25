import React, { useContext } from "react";
import { Context } from "../store/appContext";

const Dropdown = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="dropdown text-end">
        <button
          className="btn btn-sm btn-outline-dark dropdown-toggle mx-2"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {store.user.favorites.length}
        </button>

        <ul className="dropdown-menu textFavorites">
          {store.favorites === "" ? (
            <li className="text-white text-center ">No favorites</li>
          ) : (
            store.user.favorites.map((item, index) => {
              return (
                <li
                  className="d-flex align-items-center mx-1 mt-2"
                  key={index}
                  id={item.id}
                >
                  <span>{item.recipe.title}</span>

                  <button
                    className="deleteBtn btn btn-sm btn-outline-dark ml-auto"
                    style={{ width: "5rem" }}
                    onClick={() => actions.updateFavorites(item.recipe.id)}
                  ></button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
