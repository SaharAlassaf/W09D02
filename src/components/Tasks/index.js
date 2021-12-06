import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Landing from "../Landing";
import Task from "../Task";
import { logout } from "../../reducers/sign";
import axios from "axios";

function Tasks() {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const state = useSelector((state) => {
    return {
      sign: state.sign,
    };
  });

  const addTask = async (e) => {
    try {
      let name = e.target.newTaskVal.value;

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/createTask`,
        { name },
        {
          headers: { Authorization: `Bearer ${state.sign.token}` },
        }
      );
      // console.log(res.data);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {

    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/`, {
        headers: { Authorization: `Bearer ${state.sign.token}` },
      });
      // console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (e, id) => {
    try {
      let name = e.target.newTaskVal.value;

      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/updateTask/${id}`,
        { name },
        {
          headers: { Authorization: `Bearer ${state.sign.token}` },
        }
      );
      console.log(res.data);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteTask/${id}`,
        {
          headers: { Authorization: `Bearer ${state.sign.token}` },
        }
      );
      console.log(res.data);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    dispatch(logout({ user: "", token: "" }));
  };

  return (
    <>
      {state.sign.token ? (
        <>
          <form
            onSubmit={(e) => {
              addTask(e);
            }}
          >
            <input type="text" name="newTaskVal" />

            <input type="submit" value="Add" />
          </form>
          <ul>
            {tasks.map((item) => (
              <Task
                key={item._id}
                userItem={item}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </ul>
          <Link to="/">
            <button onClick={logOut}>log out</button>
          </Link>
        </>
      ) : (
        <Landing />
      )}
    </>
  );
}

export default Tasks;
