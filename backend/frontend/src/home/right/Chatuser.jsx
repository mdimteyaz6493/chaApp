import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { IoMdMenu } from "react-icons/io";
import "../../styles/chatuser.css";
import { useMenuContext } from "../../context/MenuContext"; // 👈 import context

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const { setOpenMenu } = useMenuContext(); // 👈 use context

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="chatuser-container">
      <IoMdMenu className="menu_icon" onClick={() => setOpenMenu(true)} /> {/* 👈 handle click */}
      <div>
        <div className={`avatar ${getOnlineUsersStatus(selectedConversation._id) === "Online" ? "online" : ""}`}>
          <div className="avatar-img-wrapper">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="profile"
            />
          </div>
        </div>
      </div>
      <div className="chatuser-details">
        <h1 className="chatuser-name">{selectedConversation.name}</h1>
        <span className="chatuser-status">{getOnlineUsersStatus(selectedConversation._id)}</span>
      </div>
    </div>
  );
}

export default Chatuser;
