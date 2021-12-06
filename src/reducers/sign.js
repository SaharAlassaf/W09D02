const initState = {
  user: "",
  token: "",
};

const sign = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      console.log("here");
      const { user, token } = payload;
      localStorage.setItem("token", token);
      return { user, token };

    case "LOGOUT":
      localStorage.clear();
      return payload;
      
    default:
      return state;
  }
};

export default sign;

export const login = (data) => {
  console.log("here");
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const logout = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};
