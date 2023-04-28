import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="nav__logo">
        <h3>TaskMaster</h3>
      </div>
    </Link>
  );
};

export default Logo;
