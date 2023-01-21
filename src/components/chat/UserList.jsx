import React from "react";

import User from "./User";

export default function UserList({ users, onTap }) {
  return (
    <ul className="h-full w-2/5 overflow-y-auto">
      {users.map((user) => (
        <User
          key={
            // @ts-ignore
            user.username
          }
          onTap={onTap}
          user={user}
        />
      ))}
    </ul>
  );
}
