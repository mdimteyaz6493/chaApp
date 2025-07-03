import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import "../../styles/user.css";

function getInitials(name) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return words[0][0].toUpperCase() + words[1][0].toUpperCase();
}

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const initials = getInitials(user.fullname);

  return (
    <div
      className={`user-wrapper ${isSelected ? "selected" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="user-content">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="avatar-initials">
           <span> {initials}</span>
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
