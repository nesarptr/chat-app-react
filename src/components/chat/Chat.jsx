import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
// @ts-ignore
import chatImage from "../assets/chat.png";

import { AuthContext } from "../../context/AuthProvider";

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
      latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
    }
  }
`;

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  // @ts-ignore
  const { loading, data, error } = useQuery(GET_USERS);
  // @ts-ignore
  const [getMessages, { loading: messagesLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    data?.getUsers && setUsers(data?.getUsers);
    console.log(data?.getUsers);
  }, [data?.getUsers]);

  useEffect(() => {
    messagesData?.getMessages && setMessages(messagesData.getMessages);
  }, [selectedUser]);

  const handleUserClick = (user) => {
    getMessages({
      variables: {
        from: user.username,
      },
    });
    setSelectedUser(user);
  };

  return (
    <>
      <div className="flex h-screen">
        <ul className="h-full w-1/4 overflow-y-auto">
          {users.map((user) => (
            <li
              className="flex flex-col items-center border-b border-gray-700 p-4 lg:flex-row"
              key={
                // @ts-ignore
                user.username
              }
              onClick={() => handleUserClick(user)}
            >
              <img
                className="w-16 rounded-full"
                src={chatImage}
                alt={
                  // @ts-ignore
                  user.username
                }
              />
              <div className="flex-1">
                <p className="font-medium">
                  {
                    // @ts-ignore
                    user.username
                  }
                </p>
                <p className="text-gray-500">
                  {
                    // @ts-ignore
                    user?.latestMessage?.content ||
                      "No Message Found from this user"
                  }
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex h-full w-3/4 flex-col justify-between">
          {selectedUser && (
            <>
              <div className="bg-gray-800 px-4 py-2">
                <p className="font-medium text-white">
                  {
                    // @ts-ignore
                    selectedUser.username
                  }
                </p>
              </div>
              <div>
                <ul className="overflow-y-auto p-4">
                  {messages.map((message) => (
                    <li
                      className="my-2"
                      key={
                        // @ts-ignore
                        message.uuid
                      }
                    >
                      <div>
                        {
                          // @ts-ignore
                          message.from === user.username
                            ? "You"
                            : // @ts-ignore
                              selectedUser.username
                        }
                        :{" "}
                        {
                          // @ts-ignore
                          message.content
                        }
                      </div>
                    </li>
                  ))}
                </ul>
                <form className="flex w-full p-2 ">
                  <input
                    className="mr-2 flex-1 border border-gray-500 p-2"
                    placeholder="Type your message here"
                  />
                  <button type="submit" className="p-1">
                    ▶
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mb-4 w-screen"></div>
    </>
  );
}

export default Chat;
