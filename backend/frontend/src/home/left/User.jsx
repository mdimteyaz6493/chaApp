import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import "../../styles/user.css"; 


function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`user-wrapper ${isSelected ? "selected" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="user-content">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="avatar-img">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="profile"
            />
          </div>
        </div>
        <div>
          <h1 className="user-name">{user.fullname}</h1>
          <span className="user-email">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
