import React from "react";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { useState } from "react";
import RadioButton from "../element/RadioButton";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTodoPage = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const router = useRouter();

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, status }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      setStatus("todo");
      setTitle("");
      toast.success("Todo added !");
    }
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <RadioButton
            value="todo"
            title="Todo"
            status={status}
            setStatus={setStatus}
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            value="inProgress"
            title="In Progress"
            status={status}
            setStatus={setStatus}
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            value="review"
            title="Review"
            status={status}
            setStatus={setStatus}
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            value="done"
            title="Done"
            status={status}
            setStatus={setStatus}
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        <button onClick={addHandler}>Add</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTodoPage;
