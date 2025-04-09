import React, { useEffect } from "react";
import Chatuser from "./Chatuser.jsx";
import Messages from "./Messages.jsx";
import Typesend from "./Type.jsx";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { useMenuContext } from "../../context/MenuContext"; // 👈 import menu context
import { IoMdChatboxes } from "react-icons/io";
import "../../styles/rightp.css";
import chatlogo from "../../assets/chat.png"

function Rightp() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { openMenu, setOpenMenu } = useMenuContext(); // 👈 get openMenu

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className={`rightp-container ${openMenu ? "hide" : ""}`}> {/* 👈 add class if openMenu is true */}
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div className="messages-wrapper">
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Rightp;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  const { openMenu, setOpenMenu } = useMenuContext(); // 👈 get openMenu

  return (
    <div className="nochat-container">
      <label htmlFor="my-drawer-2" className="menu-button">
        <IoMdMenu className="menu_icon" onClick={() => setOpenMenu(true)} /> {/* 👈 handle click */}
      </label>
      
      <div className="welcome-message">
      <div>
         <img src={chatlogo} alt="" className="msg-icon"/>
      </div>
        <h1 className="text-center">
          Welcome <span className="user-name">{authUser.user.fullname}</span>
          <br />
        </h1>
        <span> No chat selected, please start conversation by selecting anyone from
        your contacts</span>
      </div>
    </div>
  );
};
