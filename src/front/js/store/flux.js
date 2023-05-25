const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: "",
    },
    actions: {
      protectedInfo: async () => {
        const resp = await fetch(process.env.BACKEND_URL + "/api/protected", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt-token"),
          },
        });
        if (resp.status == 200) {
          const data = await resp.json();
          setStore({ user: data.user });
        }
      },

      logout: () => {
        localStorage.removeItem("jwt-token");
        setStore({ user: { favorites: [] } });
        return true;
      },
    },
  };
};

export default getState;
