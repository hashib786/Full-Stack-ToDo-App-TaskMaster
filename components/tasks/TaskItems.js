import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";

const TaskItems = ({ name }) => {
  return (
    <div className="taskitems__container">
      <TaskHeader name={name} />
      <TaskItem />
    </div>
  );
};

export default TaskItems;
