import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/sign";
import Landing from "../Landing";
import Task from "../Task";
import axios from "axios";

function Dashboard() {
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

  const getTasks = async () => {

    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${state.sign.token}` },
      });
      console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const deleteTasks = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/delatedTasks/${id}`,
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
          <ul>
            {tasks.map((item) => (
              <Task
                key={item._id}
                item={item}
                deleteTasks={deleteTasks}
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

export default Dashboard;
