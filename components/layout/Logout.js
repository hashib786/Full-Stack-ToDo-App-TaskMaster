import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import LogoutSvg from "../svg/LogoutSvg";

const Logout = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const sinoutHandler = () => {
    signOut({ redirect: false });
    router.push("/");
  };
  console.log(status);
  console.log(session);

  if (!session?.user) return;

  return (
    <button className="logout__btn" onClick={sinoutHandler}>
      <LogoutSvg />
    </button>
  );
};

export default Logout;
