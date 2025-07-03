import React, { useEffect, useState } from "react";
import "../../App.css"


function getInitials(name) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return words[0][0].toUpperCase() + words[1][0].toUpperCase();
}

function Message({ message }) {
  const [showOptions, setShowOptions] = useState(false);

  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-600" : "#1f2025";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(message.message);
    setShowOptions(false);
  };

useEffect(() => {
  console.log("Sender ID:", message.senderId); // ✅ Sender ID yaha console hoga

  fetch(`http://localhost:3001/api/user/info/${message.senderId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Sender User:", data); // ✅ Yahan user details console hongi
      setSenderName(data.fullname);
    })
    .catch((err) => console.error("Error fetching user:", err));
}, []);


  async function fetchSenderDetails(senderId) {
  const res = await fetch(`http://localhost:3001/api/user/${senderId}`);
  const data = await res.json();
  return data; // assume data.fullname milta hai
}


  return (
    <div
      className="p-4 relative group"
      onClick={() => setShowOptions(!showOptions)}
    >
      <div className={`chat ${chatName}`}>
        {!itsMe && (
          <div className="avatar-img-wrapper mr-2">
            <div className="avatar-initials">
              <span>{getInitials("Imteyaz")}</span>
            </div>
          </div>
        )}

        <div>
          <div className={`chat-bubble text-white ${chatColor} shadow-md`}>
            {message.message}
          </div>
          <div className="chat-footer text-xs text-gray-300 my-2">
            {formattedTime}
          </div>
        </div>
      </div>

      {showOptions && (
        <div className="absolute right-4 top-2 bg-white border shadow-lg rounded-md z-10">
          <button
            className="px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            onClick={handleCopy}
          >
            Copy
          </button>
          <button
            className="px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            onClick={() => alert("Share coming soon")}
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
}

export default Message;
