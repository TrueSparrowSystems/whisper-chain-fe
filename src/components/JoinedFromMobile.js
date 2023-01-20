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
      <div className={`${styles.mobileCardWrapper}`}>
        <div className={`${styles.mobileCardImage}`}>
        </div>
        <div className={`text-center pt-[30px] ${styles.mobileCardInfo}`}>
          <h1 className="font-bold text-[20px] text-[#000000] ">Welcome to Whisper chain</h1>
          <p className="">A new fun take on age old game some of you might know as Chinese whisper or Telephone. But with a twist of A.I.</p>
          <p className="font-bold">This experience is best viewed on bigger screen sizes.</p>
        </div>
      </div>
    </>
  );
}
