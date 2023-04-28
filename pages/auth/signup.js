import { getServerSession } from "next-auth";

import Authenticate from "@/components/auth/Authenticate";
import { authOptions } from "../api/auth/[...nextauth]";

const SignUp = () => {
  return (
    <>
      <Authenticate signup={true} />
    </>
  );
};

export default SignUp;

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
