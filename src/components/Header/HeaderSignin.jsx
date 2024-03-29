import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import { getProfileImage, resetLocalStorage, logoutApi } from "../../utils/Utils";
import Modal from "react-modal";
import SignOutLogo from "../../assets/SignOutLogo";
import Router from "next/router";
import LensPurpleIcon from "../../assets/LensPurpleIcon";
import { useSignin } from "../../context/SigninContext";

const HeaderSignin = ({ handleOpen }) => {

  // console.log("get profile image",getProfileImage());

  const [open, setOpen] = React.useState(false);
  const { isSigned, onSignin } = useSignin();
  const handleModalClose = () => {
    setOpen(false);
  };
  const handleModalOpen = () => {
    setOpen(true);
  };
  const customStyles = {
    content: {
      display: "flex",
      background: "#FFFFFF",
      height: "54px",
      width: "240px",
      marginLeft: "auto",
      marginBottom: "auto",
      backdropFilter: "blur(60px)",
      borderRadius: "8px",
      padding: "0px",
      top: "84px",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      boxShadow: "0px 8px 8px -8px rgba(0, 0, 0, 0.2), 0px 16px 24px rgba(0, 0, 0, 0.16)",
      cursor: "pointer",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.4)",
    },
  };
  const callLogoutApi = async () => {
    await logoutApi();
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
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
        // console.log("connected" + connected);
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
                <div className="flex flex-col justify-center items-center">
                  <button onClick={handleOpen} className={`flex gap-[8px] w-full h-[36px] py-[7px] px-[24px] rounded-[40px] not-italic font-bold text-[#01501E] ${styles.HeaderSignInbtn}`}>
                    <LensPurpleIcon />
                    Sign In with Lens
                  </button> 
                  <div className="flex">
                    <span className="text-[12px] mr-[5px] text-black opacity-60">on</span>
                    <span className="text-[12px] text-black opacity-80">testnet</span>
                  </div>
                </div>
                );
              }

              return isSigned ? (
                <div>
                  <div className="flex justify-center items-center gap-[8px] z-[111] cursor-pointer">
                    <div className={` box-border flex justify-center items-center  py-[4px] px-[16px] w-auto h-[36px] rounded-[40px] not-italic font-bold text-[#6F1AFF] ${styles.HandleName}`} onClick={handleModalOpen}>
                      {JSON.parse(window.localStorage.getItem("profile"))?.handle}
                    </div>

                    <img
                      src={getProfileImage() ?? "https://cdn.stamp.fyi/avatar/eth:0x3a72452af2ddc056330bbcb43898134c9adb51cf?s=250"}
                      alt="profile"
                      className="rounded-[18px] w-[36px] h-[36px]"
                      onClick={handleModalOpen}
                    />
                    <Modal onRequestClose={handleModalClose} isOpen={open} style={customStyles} ariaHideApp={false}>
                      <div className="flex flex-row items-center py-[15px] pl-[20px] w-full color-red" onClick={
                        () => {
                          callLogoutApi();
                          onSignin(false);
                          Router.reload();
                          handleModalClose();
                          resetLocalStorage();
                        }
                      }
                      >
                        <SignOutLogo />
                        <div className={`pl-[10px] ${styles.LogOutText}`}>Logout</div>
                      </div>
                    </Modal>
                  </div>
                  <div className="flex justify-center text-center mr-[38px]">
                    <span className="text-[12px] mr-[5px] text-black opacity-60">on</span>
                    <span className="text-[12px] mr-[5px] text-black opacity-80">testnet</span>
                  </div>
                </div>
              ) :
              <div className="flex flex-col justify-center items-center">
                <button onClick={handleOpen} className={`flex gap-[8px]  w-full h-[36px] py-[7px] px-[24px] bg-[#FFFFFF] rounded-[40px] not-italic font-bold text-[#6F1AFF] ${styles.HeaderSignInbtn}`}>
                  <LensPurpleIcon />
                  Sign In with Lens
                </button>
                <div className="flex">
                    <span className="text-[12px] mr-[5px] text-black opacity-60">on</span>
                    <span className="text-[12px] text-black opacity-80">testnet</span>
                  </div>
                </div>
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default HeaderSignin;