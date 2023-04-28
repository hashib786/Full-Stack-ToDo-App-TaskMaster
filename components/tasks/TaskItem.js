import TaskItemIndivisual from "./TaskItemIndivisual";
import { useSelector } from "react-redux";
import Head from "next/head";

const TaskItem = () => {
  const todos = useSelector((state) => state.todo.todos);
  const isLoading = useSelector((state) => state.todo.isLoading);
  const isError = useSelector((state) => state.todo.isError);

  return (
    <>
      <Head>
        {!isLoading && todos?.length > 0 && (
          <title>{`TaskMaster ( ${todos.length} ) || Created By Hashib`}</title>
        )}
      </Head>
      <div className="taskitem__container">
        {!isLoading && todos?.length === 0 && (
          <p className="taskitem__noContent">
            No Task Please add Any Tasks......
          </p>
        )}
        {isLoading && (
          <p className="taskitem__noContent">Fetching Data ......</p>
        )}
        {isError && <p className="taskitem__noContent">Getting Error ......</p>}
        {!isLoading &&
          todos?.map((task) => (
            <TaskItemIndivisual
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              date={task.targetDate}
              catagory={task.catagory}
            />
          ))}
      </div>
    </>
  );
};

export default TaskItem;
