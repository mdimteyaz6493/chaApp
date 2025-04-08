import React, { useEffect } from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { IoMdMenu } from "react-icons/io";
import "../../styles/chatuser.css";
import { useMenuContext } from "../../context/MenuContext";

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

  return (
    <div className="chatuser-container">
      <IoMdMenu className="menu_icon" onClick={() => setOpenMenu(true)} />

      <div>
        <div className={`avatar ${status === "Online" ? "online" : ""}`}>
          <div className="avatar-img-wrapper">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="profile"
            />
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
