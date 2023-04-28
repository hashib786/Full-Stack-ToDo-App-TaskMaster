import React from "react";

const TaskHeader = ({ name }) => {
  return (
    <div className="taskheader__container">
      <h1>{`${name.name} || Your Tasks`}</h1>
    </div>
  );
};

export default TaskHeader;
