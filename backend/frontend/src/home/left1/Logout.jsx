import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);

 const handleLogout = async () => {
  setLoading(true);
  try {
    await axios.post("/api/user/logout", {}, {
      withCredentials: true,
    });

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
    <>
      <div className="w-[4%]   bg-slate-950 text-white  flex flex-col justify-end ">
        <div className="p-3  align-bottom ">
          <button>
            <TbLogout2
              className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300"
              onClick={handleLogout}
            />
          </button>
        </div>
      </div>
    </>
  );
}
export default Logout;