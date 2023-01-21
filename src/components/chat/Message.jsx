import React from "react";

export default function Message({ message, user, selectedUser }) {
  return (
    <li
      className={`my-2 flex ${
        message.from === user.username ? "justify-end" : "justify-start"
      }`}
    >
      <div className="rounded-lg bg-gray-200 p-2">
        <p className="text-gray-700">
          {message.from === user.username ? "You" : selectedUser.username} :{" "}
          <span className="font-medium">{message.content}</span>
        </p>
      </div>
    </li>
  );
}
