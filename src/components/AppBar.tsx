const AppBar = () => {
  return (
    <nav
      className="navbar"
      style={{ height: "8vh", backgroundColor: "rgb(114, 142, 128)" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" style={{ visibility: "hidden" }}></a>
        <a
          className="navbar-brand"
          style={{ color: "white", fontSize: "2rem" }}
        >
          Itunes
        </a>
        <a className="navbar-brand" style={{ visibility: "hidden" }}></a>
      </div>
    </nav>
  );
};

export default AppBar;
