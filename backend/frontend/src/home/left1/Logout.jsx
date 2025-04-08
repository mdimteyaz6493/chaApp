import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import "../../styles/logout.css";
import { useMenuContext } from "../../context/MenuContext"; // 👈 import context

function Logout() {
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
    <div className={`logout-container ${openMenu ? "show" : ""}`}> {/* 👈 add conditional class */}
      <div className="logout-button-wrapper">
        <button>
          <TbLogout2 className="logout-icon" onClick={handleLogout} />
        </button>
      </div>
    </div>
  );
}

export default Logout;
