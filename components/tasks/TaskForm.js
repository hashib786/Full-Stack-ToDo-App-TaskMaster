import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

import { addItem } from "@/store/slice/todo";
import { setIsUpdateNull, updateTaskStore } from "@/store/slice/todo";

const addTask = async (title, description, catagory, targetDate) => {
  const response = await fetch("/api/task", {
    method: "POST",
    body: JSON.stringify({ title, description, catagory, targetDate }),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const updateTaskHand = async (id, title, description, catagory, targetDate) => {
  const response = await fetch(`/api/task/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, description, catagory, targetDate }),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const TaskForm = () => {
  const [titleRef, setTitleRef] = useState("");
  const [descriptionRef, setDescriptionRef] = useState("");
  const [catagoryRef, setCatagoryRef] = useState("general");
  const [dateRef, setDateRef] = useState("");
  const isupdate = useSelector((state) => state.todo.isUpdate);

  useEffect(() => {
    if (isupdate === null) {
      return;
    }
    const { title, description, date, catagory } = isupdate;
    setTitleRef(title);
    setDescriptionRef(description);
    setCatagoryRef(catagory);
    setDateRef(date);
  }, [isupdate]);

  const dispatch = useDispatch();

  const resetForm = () => {
    setTitleRef("");
    setDescriptionRef("");
    setCatagoryRef("general");
    setDateRef("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const title = titleRef;
    const description = descriptionRef;
    const catagory = catagoryRef;
    const date = dateRef;

    if (isupdate) {
      const toastId = toast.loading("Updating Task...");
      const updateTask = await updateTaskHand(
        isupdate.id,
        title,
        description,
        catagory,
        date
      );
      toast.dismiss(toastId);
      if (updateTask.status === "success") {
        dispatch(
          updateTaskStore({
            _id: isupdate.id,
            title,
            description,
            catagory,
            date,
          })
        );
        toast.success("Task Successfully Updated");
        dispatch(setIsUpdateNull());
        resetForm();
      } else {
        toast.error("Something Went Wrong");
      }
      return;
    }

    const toastId = toast.loading("Creating Task...");
    const newTask = await addTask(title, description, catagory, date);
    toast.dismiss(toastId);
    if (newTask.status === "success") {
      toast.success("Task Added");
      resetForm();
      dispatch(addItem(newTask.newTask));
    } else {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <form
      className={`task__form ${isupdate && "update"}`}
      onSubmit={submitHandler}
    >
      <div className="form__title task__form--item">
        <label htmlFor="title">Title</label>
        <input
          minLength={5}
          required
          type="text"
          id="title"
          placeholder="Task Title   ........."
          value={titleRef}
          onChange={(e) => setTitleRef(e.target.value)}
        />
      </div>

      <div className="form__description task__form--item">
        <label htmlFor="description">Description</label>
        <textarea
          minLength={15}
          required
          id="description"
          rows="5"
          placeholder="Task Description   .........."
          value={descriptionRef}
          onChange={(e) => setDescriptionRef(e.target.value)}
        ></textarea>
      </div>

      <div className="form__catagory task__form--item">
        <label htmlFor="catagory">Catagory</label>
        <select
          required
          id="catagory"
          placeholder="Task Title"
          value={catagoryRef}
          onChange={(e) => setCatagoryRef(e.target.value)}
        >
          <option value="general">General</option>
          <option value="education">Education</option>
          <option value="urgent">Urgent</option>
          <option value="office">Office</option>
        </select>
      </div>

      <div className="form__date task__form--item">
        <label htmlFor="date">Date</label>
        <input
          required
          type="date"
          id="date"
          placeholder="Task Title........"
          value={dateRef}
          onChange={(e) => setDateRef(e.target.value)}
        />
      </div>

      <div className="form__button task__form--item">
        <button className="form__submit--btn">
          {isupdate ? "Update Task" : "Crete Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
