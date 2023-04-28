import { useState } from "react";
import { removeItem } from "@/store/slice/todo";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setIsUpdate } from "@/store/slice/todo";

const deleteTask = async (id) => {
  const response = await fetch(`/api/task/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "content-type": "application/json",
    },
  });
  return response.ok;
};

const TaskItemIndivisual = ({ id, title, description, date, catagory }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const activeHandler = () => {
    setActive((prev) => !prev);
  };

  const deleteItemHandler = async () => {
    const loadToast = toast.loading("Delting Task...");
    const isDeleted = await deleteTask(id);
    if (isDeleted) {
      dispatch(removeItem(id));
      toast.dismiss(loadToast);
      toast.success("Deleted Task");
    } else toast.error("Something Is deleting when i delete task");
  };

  const editHandler = () => {
    dispatch(setIsUpdate({ id, title, description, date, catagory }));
  };

  const formatedDate = new Date(date).toLocaleString("en-Us", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <div className="item__container" onClick={activeHandler}>
      <div className="title__show">
        <div className="title__date">
          <p className="title__date--formate">{formatedDate}</p>
        </div>
        <div className="title__title">
          <h3 className="title__show-title">{title}</h3>
        </div>
        <div className="title__functions">
          <button className="function__edit title__btn" onClick={editHandler}>
            Edit
          </button>
          <button
            className="function__delete title__btn"
            onClick={deleteItemHandler}
          >
            Delete
          </button>
        </div>
        <div className={`title__batch ${catagory}`}>
          <span className="title__batch--data">{catagory}</span>
        </div>
      </div>

      {active && (
        <div className={`item__container--hide`}>
          <hr className="item__line" />
          <div className="item__title">
            <h3 className="item__label">Title</h3>
            <p className="item__hide--title">{title}</p>
          </div>

          <div className="item__description">
            <h3 className="item__label">Description</h3>
            <p className="item__hide--desc">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItemIndivisual;
