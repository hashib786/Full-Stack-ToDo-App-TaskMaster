import { getServerSession } from "next-auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "@/store/slice/todo";

import { authOptions } from "../api/auth/[...nextauth]";
import TaskContainer from "@/components/tasks/TaskContainer";

const AllTasks = ({ email, Username }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);
  return (
    <>
      <TaskContainer name={Username} />
    </>
  );
};

export default AllTasks;

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signup",
        permanent: false,
      },
    };
  }

  return {
    props: { email: session.user.email, Username: session.user.name },
  };
}
