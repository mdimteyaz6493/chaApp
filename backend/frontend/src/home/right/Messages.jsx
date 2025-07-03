import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import axios from "axios";
import toast from "react-hot-toast";


dayjs.extend(isToday);
dayjs.extend(isYesterday);

function Messages() {
  const { loading, messages, setMessages } = useGetMessage(); // `setMessages` must be in your context
  useGetSocketMessage();

  const lastMsgRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};

    messages.forEach((message) => {
      const date = dayjs(message.createdAt);
      let label = date.isToday()
        ? "Today"
        : date.isYesterday()
        ? "Yesterday"
        : date.format("DD MMM YYYY");

      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(message);
    });

    return groups;
  };


  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex-1 overflow-y-auto" style={{ minHeight: "calc(92vh - 8vh)" , backgroundColor:"#14151a"}}>
      {loading ? (
        <Loading />
      ) : (
        Object.keys(groupedMessages).map((dateLabel) => (
          <div key={dateLabel}>
            <div className="text-center text-sm text-gray-500 my-4">{dateLabel}</div>
            {groupedMessages[dateLabel].map((message, idx, arr) => (
              <div
                key={message._id}
                ref={idx === arr.length - 1 ? lastMsgRef : null}
              >
                <Message message={message}/>
              </div>
            ))}
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">Say! Hi to start the conversation</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
