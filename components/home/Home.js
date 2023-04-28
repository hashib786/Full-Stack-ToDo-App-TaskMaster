import Link from "next/link";

const Home = () => {
  return (
    <div className="home__main container">
      <header className="header">
        <div className="home__heading">
          <h1>
            <span>TaskMaster</span> <br />
            Your Personal Task Management Assistant
          </h1>
        </div>

        <div className="alltask">
          <Link className="btn home--btn" href="/tasks">
            Show All Tasks
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Home;
