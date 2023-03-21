import React, { useState } from "react";
import styles from "./AddWhisperBtn.module.css";
import { useRouter } from "next/router";
import { useBottomTab } from "../context/BottomTabContext";

const ShareBtn = ({ height, width }) => {
  const pageIndex = 0;
  const { onTabChange } = useBottomTab();
  const router = useRouter();
  const goToHome = () => {
        router.push("/");
        onTabChange(TabItems[pageIndex]);
  };
  return (
    <a
      className={`w-[${width}px] h-[${height}px] rounded-[40px] flex items-center justify-center z-10 cursor-pointer ${styles.Buttonbg}`}
      target="_blank"
      onClick={goToHome}
    >
      <div className="not-italic -tracking-[0.03em] font-extrabold text-[16px] leading-[100%] text-center text-[#FFFFFF]">
        View other chains
      </div>
    </a>
  );
};

export default ShareBtn;
 