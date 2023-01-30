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
      <div className="m-[20px]">
        <div className={`${styles.mobileCardWrapper}`}>
          <div className={`${styles.mobileCardImage}`}>
          </div>
          <div className={`text-center pt-[30px] ${styles.mobileCardInfo}`}>
            <h1 className="font-bold text-[20px] text-[#000000]">Welcome to Whisper chain</h1>
            <p className="text-[16px] leading-[160%] p-[10px]">A new fun take on age old game some of you might know as Chinese whisper or Telephone. But with a twist of A.I.</p>
            <p className="font-bold pt-[20px]">This experience is best viewed on bigger screen sizes.</p>
            <div className="flex justify-center pt-[10px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 5.00001H12.5M4 4V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V4.00001C16 2.89544 15.1046 2.00001 14 2.00001L6 2C4.89543 2 4 2.89543 4 4ZM10 14H10.0708V14.0641H10V14Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2 17.0254L16.5 2.52539" stroke="#666666" stroke-width="1.5" stroke-linecap="round" />
                <path d="M2 15.5L16.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
