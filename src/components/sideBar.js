import React, { useState } from "react";
import "./Sidebar.css";
import chameleon from "../images/chameleon.png";
import user from "../images/user.png";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? "" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleCollapse}>
        {collapsed ? "<<" : ">>"}
      </button>
      <div className="sidebar-content">
        <img id="logo" src={chameleon} alt="Logo"></img>

        <div className="user">
          <img id="avatar" src={user} alt="Avatar"></img>
          <div className="user-info">
            <p id="welcome-mssg">Welcome, admin</p>
            <div className="user-info-bttns">
              <button id="log-out">Log out</button>
              <button id="edit-user">Edit user</button>
            </div>
          </div>
        </div>
      </div>
      <hr id="hr" />

      <ul className="sidebar-nav">
        <li>
          <a href="/">Terrarium 1</a>
        </li>
        <li>
          <a href="/">Terrarium 2</a>
        </li>
        <li>
          <a href="/">Terrarium 3</a>
        </li>
      </ul>

      <div className="add-terrarium">
        <button id="add-terrarium">+ Add terrarium</button>
      </div>
    </div>
  );
}

export default Sidebar;
