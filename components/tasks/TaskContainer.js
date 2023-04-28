import TaskForm from "./TaskForm";
import TaskItems from "./TaskItems";

const TaskContainer = ({ name }) => {
  return (
    <div className="task__container">
      <TaskForm />
      <TaskItems name={name} />
    </div>
  );
};

export default TaskContainer;
