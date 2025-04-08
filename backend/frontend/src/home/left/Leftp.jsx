import React from "react";
import Search from "./Search";
import Users from "./Users";
import "../../styles/leftp.css";
import { useMenuContext } from "../../context/MenuContext"; // 👈 import context

function Leftp() {
  const { openMenu } = useMenuContext(); // 👈 get openMenu from context

  return (
    <div className={`left-panel ${openMenu ? "expand" : ""}`}> {/* 👈 conditionally add class */}
      <h1 className="chat-heading">Chats</h1>
      <Search />
      <div className="users-container">
        <Users />
      </div>
    </div>
  );
}

export default Leftp;
