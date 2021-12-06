const initState = {
    tasks: [],
  };
  
  const tasks = (state = initState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "LOGIN":
        const { role, token } = payload;
        localStorage.setItem("token", token);
        return { role, token };
  
      case "LOGOUT":
        localStorage.clear();
        return payload;
        
      default:
        return state;
    }
  };
  
  export default tasks;
  
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
  