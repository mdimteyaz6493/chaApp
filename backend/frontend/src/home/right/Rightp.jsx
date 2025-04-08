import React, { useEffect } from "react";
import Chatuser from "./Chatuser.jsx";
import Messages from "./Messages.jsx";
import Typesend from "./Type.jsx";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";
import { useMenuContext } from "../../context/MenuContext"; // 👈 import menu context
import "../../styles/rightp.css";

function Rightp() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { openMenu } = useMenuContext(); // 👈 get openMenu

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

  return (
    <div className="nochat-container">
      <label htmlFor="my-drawer-2" className="menu-button">
        <CiMenuFries className="menu-icon" />
      </label>
      <div className="welcome-message">
        <h1 className="text-center">
          Welcome <span className="user-name">{authUser.user.fullname}</span>
          <br />
          No chat selected, please start conversation by selecting anyone from
          your contacts
        </h1>
      </div>
    </div>
  );
};
