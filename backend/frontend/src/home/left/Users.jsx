import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";
import { useMenuContext } from "../../context/MenuContext"; // 👈 Import context

function Users() {
  const [allUsers] = useGetAllUsers();
  const { setOpenMenu } = useMenuContext(); // 👈 Get setter from context

  const handleUserClick = () => {
    setOpenMenu(false); // 👈 Close menu on user click
  };

  return (
    <div>
      <h1 className="px-4 py-2 text-white font-semibold">Messages</h1>
      <div className="overflow-y-auto" style={{ maxHeight: "80vh" }}>
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
