import React, { useState, useContext } from "react";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";

import UserList from "./UserList";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { AuthContext } from "../../context/AuthProvider";
import LoadingSpinner from "../ui/LoadingSpinner";

const SEND_MESSAGE = gql`
  mutation sendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

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
  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) => {
      setUsers(data.getUsers);
    },
  });
  // @ts-ignore
  const [getMessages, { loading: messagesLoading }] = useLazyQuery(
    GET_MESSAGES,
    {
      onCompleted: (data) => {
        setMessages(data.getMessages);
      },
    }
  );

  const handleUserClick = (user) => {
    getMessages({
      variables: {
        from: user.username,
      },
    });
    setSelectedUser(user);
  };

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      // @ts-ignore
      setMessages((msgs) => [data.sendMessage, ...msgs]);
      // @ts-ignore
      setUsers((users) => {
        // @ts-ignore
        const ind = users.findIndex(
          // @ts-ignore
          (user) => user.username === data.sendMessage.to
        );
        const updatedUser = {
          // @ts-ignore
          ...users[ind],
          latestMessage: data.sendMessage,
        };
        const updatedUsers = [...users];
        updatedUsers[ind] = updatedUser;
        return updatedUsers;
      });
    },
    onError: (err) => console.error(err),
  });

  return (
    <div className="flex h-screen pb-12">
      {loading ? (
        <div className="self-start pl-8 pt-8">
          <LoadingSpinner />
        </div>
      ) : (
        <UserList onTap={handleUserClick} users={users} />
      )}
      <div className="flex h-full w-3/5 flex-col justify-between">
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
            {messagesLoading ? (
              <LoadingSpinner />
            ) : (
              <div>
                <MessageList
                  messages={messages}
                  user={user}
                  selectedUser={selectedUser}
                />
                <MessageForm
                  onMessageSend={sendMessage}
                  selectedUser={selectedUser}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
