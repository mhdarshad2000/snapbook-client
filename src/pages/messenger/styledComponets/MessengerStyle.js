import styled from "styled-components";

export const MessengerWrapper = styled.section`
  height: calc(100vh - 70px);
  display: flex;
  margin-top: 57px;
`;

export const ChatMenuInput = styled.input`
    width: 90%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid gray;
`
export const ChatMessageInput = styled.textarea`
    height: 90px;
    padding: 10px;
    width: 80%;
`
export const ChatSendButton = styled.button`
    width: 70px;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: teal;
    color: white;
`