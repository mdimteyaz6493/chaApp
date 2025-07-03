import React, { useState } from "react";
import Search from "./Search";
import Users from "./Users";
import "../../styles/leftp.css";
import { useMenuContext } from "../../context/MenuContext"; // 👈 import context
import { TbLogout2 } from "react-icons/tb";
import toast from "react-hot-toast";
import axios from "axios";


function Leftp() {
  const [loading, setLoading] = useState(false);
  const { openMenu } = useMenuContext(); // 👈 get openMenu from context

    const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/logout", {}, { withCredentials: true });

      localStorage.removeItem("ChatApp");
      toast.success("Logged out successfully");
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
      setLoading(false);
    }
  };

  return (
    <div className={`left-panel ${openMenu ? "expand" : ""}`}> {/* 👈 conditionally add class */}
     <div className="left_head">
       <h1 className="chat-heading">Chats</h1>
     <TbLogout2 className="logout-icon" onClick={handleLogout} />
     </div>
      <Search />
      <div className="users-container">
        <Users />
      </div>
    </div>
  );
}

export default Leftp;
