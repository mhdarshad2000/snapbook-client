import { useEffect, useRef, useState } from "react";
import "./style.scss";
import Header from "../../component/header/Header";
import Conversation from "./Conversation";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { useSelector } from "react-redux";
import { Axios } from "../../helpers/Axios";
import { io } from "socket.io-client";
import { searchUser } from "../../functions/user";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import {
  ChatInput,
  FocusedText,
  MessengerBox,
  TextMessage,
} from "../../styledComponent/styled";
let typingTimer;

export default function Messenger() {
  const [searchResult, setSearchresult] = useState([]);
  const [conversations, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [reciever, setReciever] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useSelector((user) => ({ ...user }));
  const scrollRef = useRef(null);
  const socket = useRef();
  const searchInput = useRef();

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
      const res = await Axios.get(`/getConversation/${user.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
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
      const res = await Axios.get(`/getMessage/${currentChat._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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

  const handleSearch = async () => {
    const value = searchInput.current.value;
    const search = await searchUser(value, user.token);
    setSearchresult(search);
  };

  const handleConversation = async (c) => {
    try {
      setCurrentChat(c);
      const recievers = c.members.filter((member) => member !== user.id);
      const { data } = await Axios.get(`getUser/${recievers[0]}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setReciever(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header page="messenger" />
        <MessengerBox w={"100vw"} h={"100vh"} bg={"var(--bg-secondary)"}>
          <MessengerBox
            flex={"1"}
            bg={"var(--bg-secondary)"}
            wrap={"column"}
            smallJustify={"start"}
          >
            <Box className="left_box">
              <ChatInput
                placeholder="search for Friends...."
                ref={searchInput}
                onKeyDown={() => clearTimeout(typingTimer)}
                onKeyUp={() => {
                  clearTimeout(typingTimer);
                  typingTimer = setTimeout(() => {
                    handleSearch();
                  }, 1000);
                }}
              />
              {conversations &&
                conversations.map((c) => (
                  <div
                    onClick={() => {
                      handleConversation(c);
                    }}
                  >
                    <Conversation key={c._id} conversation={c} user={user} />
                  </div>
                ))}
            </Box>
            <Box className="online_users small_screen">
              <FocusedText fs={"16px"}>Online Users</FocusedText>
              <ChatOnline
                onlineUsers={onlineUsers}
                user={user}
                setCurrentChat={setCurrentChat}
              />
            </Box>
          </MessengerBox>
          <MessengerBox
            fd={"column"}
            flex={"2"}
            bg={"var(--bg-secondary)"}
            position={"relative"}
          >
            <Box className="chat_box">
              {reciever ? (
                <Box
                  className="chatbox_header"
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Avatar src={reciever?.picture} />
                  <FocusedText fs={"16px"} fw={"500"} color={"white"}>
                    {reciever.first_name} {reciever.last_name}{" "}
                  </FocusedText>
                </Box>
              ) : (
                ""
              )}
              <Box className="chat_body">
                {messages
                  ? messages.map((m, i) => (
                      <Box ref={scrollRef} key={i}>
                        <Message
                          message={m}
                          conversations={conversations}
                          own={m.sender === user.id}
                          user={user}
                        />
                      </Box>
                    ))
                  : "No messages yet start texting"}
              </Box>
              {messages && (
                <Box
                  sx={{
                    margin: "20px",
                    position: "absolute",
                    bottom: "0px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextMessage
                    maxLength={50}
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <Button onClick={messageHandler}>
                    <SendIcon />
                  </Button>
                </Box>
              )}
            </Box>
          </MessengerBox>
          <MessengerBox
            flex={"1"}
            bg={"var(--bg-secondary)"}
            position={"relative"}
            display={"none"}
          >
            <Box className="online_users">
              <FocusedText fs={"16px"}>Online Users</FocusedText>
              <ChatOnline
                onlineUsers={onlineUsers}
                user={user}
                setCurrentChat={setCurrentChat}
              />
            </Box>
          </MessengerBox>
        </MessengerBox>
      </Grid>
    </Grid>
  );
}
