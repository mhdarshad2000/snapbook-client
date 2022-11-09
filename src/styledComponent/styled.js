import styled from "styled-components";

export const Boxe = styled.div`
  border-radius: ${(props) => props.br || "5px"};
  border: ${(props) => props.border || "1px solid gray"};
  padding: ${(props) => props.padding || "10px"};
  margin-top: ${(props) => props.margin || "2px"};
  width: ${(props) => props.width || "75vw"};
  background: ${(props) => props.bg || "none"};
  position: ${(props) => props.position || "none"};
  bottom: ${(props) => props.bottom || "0px"};
  left: ${(props) => props.left || "0px"};
  height: ${(props) => props.height || "0px"};
  margin-bottom: ${(props) => props.mb || "0px"};
  overflow-y: ${(props) => props.overflowY || "none"};
  @media (max-width: 1280px) {
    width: ${(props) => props.widthS || "none"};
  }
`;

export const FocusedText = styled.p`
  font-weight: ${(props) => props.fw || "600"};
  font-size: ${(props) => props.fs || "15px"};
  margin: ${(props) => props.m || "0"};
  @media (max-width: 500px) {
  }
`;
export const RowFlexBox = styled.div`
  display: ${"flex"};
  flex-direction: ${(props) => props.fd || "row"};
  align-items: ${"center"};
  justify-content: ${(props) => props.jc || "none"};
  gap: ${"5px"};
  margin: ${(props) => props.m || "0px"};
  @media (max-width: 500px) {
    flex-direction: ${(props) => props.fd || "column"};
  }
`;

export const StoryRound = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: var(--bg-primary);
  margin-bottom: 15px;
  border: ${(props) => props.border || "3px solid gray"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.bgImg || ""});
  cursor: pointer;
  gap: 5px;
`;

export const BorderedBox = styled.div`
  width: 75vw;
  height: 125px;
  position: relative;
  bottom: 50px;
  background: var(--bg-white);
  border-radius: ${(props) => props.br || "5px"};
  border: ${(props) => props.border || "1px solid gray"};
`;

export const StoryInput = styled.textarea`
  border: 1px solid var(--shadow-1);
  min-height: 35px;
  margin-left: 15px;
  max-width: 75%;
  min-width: 75%;
  font-size: 18px;
  align-content: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
export const SuggestionBox = styled.div`
  border: 1px solid var(--shadow-2);
  height: auto;
  padding: 12px;
  border-radius: 5px;
  margin-top: 8px;
  background-color: white;
  align-items: center;
  display: flex;
  gap: 7px;
  @media (max-width: 1280px) {
    padding-left: 0;
    padding-right: 0;
    gap: 2px;
  }
`;
export const MessengerBox = styled.div`
  width: ${(props) => props.w || "none"};
  height: ${(props) => props.h || "none"};
  background-color: ${(props) => props.bg || "var(--bg-secondary)"};
  display: flex;
  justify-content: ${(props) => props.jc || "space-between"};
  flex: ${(props) => props.flex || "none"};
  flex-direction: ${(props) => props.fd || "row"};
  position: ${(props) => props.position || "none"};
  @media (max-width: 1024px) {
    display: ${(props) => props.display || ""};
    flex-direction: ${(props) => props.wrap || ""};
    justify-content: ${(props) => props.smallJustify || ""};
  }
`;

export const ChatInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border-bottom: 1px solid var(--shadow-1);
  padding-left: 20px;
`;

export const TextMessage = styled.input`
  max-width: 90%;
  min-width: 90%;
  max-height: 50px;
  min-height: 50px;
  border: 1px solid var(--shadow-1);
  padding: 10px;
  font-size: 20px;
  border-radius: 10px;
  @media (max-width: 1400px) {
    max-width: 80%;
    min-width: 80%;
  }
  @media (max-width: 1024px) {
    max-height: 40px;
    min-height: 40px;
    padding: 6px;
    font-size: 18px;
  }
`;
