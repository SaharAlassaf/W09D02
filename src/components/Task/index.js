import React, { useState } from "react";
import { useSelector } from "react-redux";

function Task({ item, deleteTasks, userItem, deleteTask, updateTask }) {
  const [update, setUpdate] = useState(false);

  const state = useSelector((state) => {
    return {
      sign: state.sign,
    };
  });

  return (
    <>
      {state.sign.role === "admin" ? (
        <>
          <li key={item._id}>
            {item.name}
            <button onClick={() => deleteTasks(item._id)}>delete</button>
          </li>
        </>
      ) : (
        <li key={userItem._id}>
          {userItem.name}
          {update && (
            <form
              onSubmit={(e) => {
                updateTask(e, userItem._id);
                setUpdate(false);
              }}
            >
              <input type="text" name="newTaskVal" />

              <input type="submit" value="Done" />
            </form>
          )}
          {!update && <button onClick={() => setUpdate(!update)}>edit</button>}
          <button onClick={() => deleteTask(userItem._id)}>delete</button>
        </li>
      )}
    </>
  );
}

export default Task;
