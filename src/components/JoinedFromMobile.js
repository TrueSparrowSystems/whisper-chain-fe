import React from "react";
import styles from "./JoinedFromMobile.module.css";
import InfoLogo from "../assets/InfoLogo";
import Logo from "../assets/Logo";
import WhisperChainShortLogo from "../assets/WhisperChainShortLogo";
import MobileNotSupported from "../assets/MoblieNotSupported";
import GenerateLogo from "../assets/tabLogos/GenerateLogo";
import CollectIcon from "../assets/CollectIcon";
import PlusIcon from "../assets/PlusIcon";

export default function JoinedFromMobile() {
  const handlePLGClick = () => {
    const plgURL = "https://plgworks.com/";
    window.open(plgURL, "_blank");
  };
  const handleNotionClick = () => {
    const plgURL =
      "https://plgworks.notion.site/Whisper-Chain-fc95cbdc8f9a4a41b87747a190477a61";
    window.open(plgURL, "_blank");
  };

  return (
    <>
      <div className="flex pt-[40px]">
        <Logo />
      </div>
      <div className={`${styles.mainContainer}`}>
        <div
          className={`flex justify-center items-center ${styles.imageContainer}`}
        >
          <div className={`flex gap-[8px] top-[16px] ${styles.functionbtns}`}>
            Generate <GenerateLogo />
          </div>
          <div className={`${styles.WCbtn}`}>
            <WhisperChainShortLogo />
          </div>
          <div>
            <div
              className={`flex gap-[8px] left-[42px] bottom-[62px] ${styles.functionbtns}`}
            >
              Collect <CollectIcon />
            </div>
            <div
              className={`flex gap-[8px] right-[42px] bottom-[62px] ${styles.functionbtns}`}
            >
              Post{" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.125 10H16.875"
                  stroke="#000000"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 3.125V16.875"
                  stroke="#000000"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-[16px] justify-center items-center px-[24px]">
          <span className={`pb-[8px] ${styles.heading}`}>
            Welcome to Whisper chain
          </span>
          <p className={`pb-[24px] ${styles.subHeading1}`}>
            A new fun take on age old game some of you might know as Chinese
            whisper or Telephone. But with a twist of A.I.
          </p>
          <span className={`pb-[54px]${styles.subHeading2}`}>
            This experience is best viewed on bigger screen sizes.
          </span>
          <div className="pt-[15px] pb-[23px]">
            <MobileNotSupported />
          </div>
        </div>
      </div>
      <div
        className={`flex w-full justify-between items-center ${styles.bottomContainer}`}
      >
        <div
          className={`flex relative not-italic font-medium text-[16px] ${styles.infoTab}`}
        >
          <button
            onClick={handleNotionClick}
            className={`flex justify-center gap-[8.5px] items-center hover:text-[#000000]`}
          >
            {" "}
            <InfoLogo /> How it works
          </button>
        </div>

        <div
          className={`flex relative not-italic justify-end font-medium text-[16px] ${styles.infoTab}`}
        >
          <div className="hover:text-[#000000]">
            <button onClick={handlePLGClick}>Made with 🧡 by PLG</button>
          </div>
        </div>
      </div>
    </>
  );
}
