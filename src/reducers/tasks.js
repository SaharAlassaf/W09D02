const initState = {
  userTask: [],
  adminTask: []
};

const tasks = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_TASKS":
      const { userTask } = payload;
      return { userTask };

    case "ADMIN_TASKS":
      const { adminTask } = payload;
      return { adminTask };

    default:
      return state;
  }
};

export default tasks;

export const userTasks = (data) => {
  return {
    type: "USER_TASKS",
    payload: data,
  };
};

export const adminTasks = (data) => {
  return {
    type: "ADMIN_TASKS",
    payload: data,
  };
};
