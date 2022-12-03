import React from "react";
import styled from "styled-components";
import ChainLogo from "../assets/ChainLogo";
import { PostImage } from "../components/PostImage";

const MessageBox = styled.div`
  width: 512px;
  height: 251px;
  background: radial-gradient(
    51.4% 51.4% at 48.6% 50%,
    #16082d 0%,
    #100324 100%
  );
  border: 4px solid rgba(111, 26, 255, 0.24);
  backdrop-filter: blur(48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 48px;
  box-sizing: border-box;
`;

const Message = styled.div`
  width: 409px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const WhiteText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #e7d9ff;
`;

const ButtonBg = styled.div`
  width: 200px;
  height: 48px;

  background: radial-gradient(
    107.14% 107.14% at 50% 80.95%,
    #ffe431 0%,
    #ffe11a 100%
  );
  box-shadow: 0px 8px 32px rgba(254, 233, 45, 0.32),
    inset 0px -4px 8px rgba(119, 103, 0, 0.6), inset 0px -8px 16px #ffbe16;
  border-radius: 40px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 100%;

  text-align: center;
  letter-spacing: -0.03em;

  color: #111111;
`;

const ChainWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Chain = () => {
  return (
    <>
      <MessageBox>
        <Message>
          <WhiteText>
            This was the last image added to the thread, try to describe this
            image in your own words as best you can, and add your generation to
            this thread.
          </WhiteText>
        </Message>

        <ButtonBg>
          <ButtonText> Add whisper to chain </ButtonText>
        </ButtonBg>
      </MessageBox>
      <ChainWrapper>
        <ChainLogo />
      </ChainWrapper>
      <PostImage imgSrc="https://static.plgworks.com/assets/images/hon/vespa.jpg" />

      <ChainWrapper>
        <ChainLogo />
      </ChainWrapper>
      <PostImage imgSrc="https://static.plgworks.com/assets/images/hon/vespa.jpg" />
      <ChainWrapper>
        <ChainLogo />
      </ChainWrapper>
      <PostImage imgSrc="https://static.plgworks.com/assets/images/hon/vespa.jpg" />
    </>
  );
};

export default Chain;
