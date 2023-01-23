import React from "react";

import User from "./User";

const displayUsers = (users, onTap) => {
  const usersArray = [];
  for (const username in users) {
    usersArray.push(
      <User
        key={
          // @ts-ignore
          username
        }
        onTap={onTap}
        user={users[username]}
      />
    );
  }
  return usersArray;
};

export default function UserList({ users, onTap }) {
  return (
    <ul className="h-4/5 w-2/5 overflow-y-auto">
      {displayUsers(users, onTap)}
    </ul>
  );
}
