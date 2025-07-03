import React, { useEffect } from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { IoMdMenu } from "react-icons/io";
import "../../styles/chatuser.css";
import { useMenuContext } from "../../context/MenuContext";
import { FaArrowLeft } from "react-icons/fa";


function getInitials(name) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return words[0][0].toUpperCase() + words[1][0].toUpperCase();
}

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const { setOpenMenu } = useMenuContext();

  // ✅ Check online status based on userId string
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  // useEffect(() => {
  //   if (selectedConversation) {
  //     console.log("💬 Selected Conversation:", selectedConversation);
  //     console.log("🟢 Online Users from socket:", onlineUsers);
  //     console.log(
  //       `📶 ${selectedConversation.fullname} is:`,
  //       getOnlineUsersStatus(selectedConversation._id)
  //     );
  //   }
  // }, [selectedConversation, onlineUsers]);

  if (!selectedConversation) return null;

  const status = getOnlineUsersStatus(selectedConversation._id);

  const initials = getInitials(selectedConversation.fullname);

  return (
    <div className="chatuser-container">
      <FaArrowLeft className="menu_icon" onClick={() => setOpenMenu(true)} />

      <div>
        <div className={`avatar ${status === "Online" ? "online" : ""}`}>
          <div className="avatar-img-wrapper">
          <div className="avatar-initials">
           <span> {initials}</span>
          </div>
          </div>
        </div>
      </div>

      <div className="chatuser-details">
        <h1 className="chatuser-name">{selectedConversation.fullname}</h1>
        <span className="chatuser-status">{status}</span>
      </div>
    </div>
  );
}

export default Chatuser;
