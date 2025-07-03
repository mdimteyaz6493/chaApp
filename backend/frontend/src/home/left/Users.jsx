import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";
import { useMenuContext } from "../../context/MenuContext"; // 👈 Import context
import "../../styles/users.css"

function Users() {
  const [allUsers] = useGetAllUsers();
  const { setOpenMenu } = useMenuContext(); // 👈 Get setter from context

  const handleUserClick = () => {
    setOpenMenu(false); // 👈 Close menu on user click
  };

  return (
    <div>
      <div className="user_cont">
        {allUsers.map((user, i) => (
          <div key={i} onClick={handleUserClick}> {/* 👈 Add click handler */}
            <User user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
