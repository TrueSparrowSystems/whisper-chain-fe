import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import WalletBtn from "../../assets/WalletBtn";
import { resetLocalStorage } from "../../utils/Utils";
import SignAuthentication from "./SignAuthentication";
import styled from "styled-components";

const Signin = styled.div`
    background: #ABFE2C;
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: #00501E;
`;

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div
                    onClick={() => {
                      resetLocalStorage();
                      openConnectModal();
                      
                    }}
                  >
                  <Signin className={`flex justify-center box-border items-center w-[234px] h-[40px] backdrop-blur rounded-[4px]`}>Sign in with Lens</Signin>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return <SignAuthentication />;
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
