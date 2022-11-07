import { Fragment, useEffect, useRef, useState } from "react";
import "./style.scss";
import Header from "../../component/header/Header";
import {
  ChatMenuInput,
  ChatMessageInput,
  ChatSendButton,
  MessengerWrapper,
} from "./styledComponets/MessengerStyle";
import Conversation from "./Conversation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { useSelector } from "react-redux";
import { Axios } from "../../helpers/Axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useSelector((user) => ({ ...user }));
  const scrollRef = useRef(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  console.log(arrivalMessage);
  useEffect(() => {
    arrivalMessage &&
      currentChat.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.friends.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, []);
  useEffect(() => {
    getConversations();
  }, [user.id]);
  const getConversations = async () => {
    try {
      const res = await Axios.get(`/getConversation/${user.id}`);
      setConversation(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getMessages();
  }, [currentChat, user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const getMessages = async () => {
    try {
      const res = await Axios.get(`/getMessage/${currentChat._id}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const messageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const recieverId = currentChat.members.find((member) => member !== user.id);
    socket.current.emit("sendMessage", {
      senderId: user.id,
      recieverId: recieverId,
      text: newMessage,
    });
    try {
      const res = await Axios.post("/newMessage", message, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Header page="messenger" />
      <MessengerWrapper>
        <div className="chatMenu">
          <div className="chatMenu_wrapper">
            <ChatMenuInput placeholder="Search user" />
            {conversations &&
              conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation key={c._id} conversation={c} user={user} />
                </div>
              ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBox_wrapper">
            {currentChat ? (
              <>
                <div className="chatBox_top">
                  {messages &&
                    messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === user.id} />
                      </div>
                    ))}
                </div>
                <div className="chatBox_bottom">
                  <ChatMessageInput
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <ChatSendButton onClick={messageHandler}>Send</ChatSendButton>
                </div>
              </>
            ) : (
              <span className="no_conversation_text">
                Open a conversation to start chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnline_wrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              user={user}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </MessengerWrapper>
    </Fragment>
  );
}
