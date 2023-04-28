import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

import Authenticate from "@/components/auth/Authenticate";

const Login = () => {
  return (
    <>
      <Authenticate signup={false} />
    </>
  );
};

export default Login;

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/tasks",
        permanent: false,
      },
    };
  }

  return {
    props: { session: JSON.stringify(session) },
  };
}
