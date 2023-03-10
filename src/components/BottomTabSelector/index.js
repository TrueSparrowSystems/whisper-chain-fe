import InfoLogo from "../../assets/InfoLogo";
import { useRouter } from "next/router";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.css";
import React from "react";
import { usePublicationContext } from "../../context/PublicationContext";
import Typewriter from "typewriter-effect";

export default function BottomTabSelector() {
  const { currentTab, onTabChange } = useBottomTab();
  const { publication } = usePublicationContext();
  const handlePLGClick = () => {
    const plgURL = "https://truesparrow.com/";
    window.open(plgURL, "_blank");
  };
  const handleNotionClick = () => {
    const plgURL =
      "https://www.notion.so/truesparrow/Whisper-Chain-fc95cbdc8f9a4a41b87747a190477a61";
    window.open(plgURL, "_blank");
  };
  const router = useRouter();
  React.useEffect(() => {
    if (router.route.includes(`/generate`)) {
      onTabChange(TabItems[1]);
    } else {
      onTabChange(TabItems[0]);
    }
  }, []);

  return (
    <div
      className={`flex w-full justify-between items-center ${styles.mainContainer}`}
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

      <div className={styles.container}>
        {TabItems.map((tab, index) => {
          const isSelected = tab.id === currentTab.id;
          return (
            <div
              key={index}
              onClick={() => {
                if (tab.id === "Chains") {
                  router.push(tab.route);
                } else {
                  router.push(tab.route + publication.chainId);
                }
                onTabChange(tab);
              }}
              id={tab.id}
              className={`${styles.tabContainer} ${
                isSelected ? styles.selectedTab : styles.notSelectedTab
              }`}
            >
              {tab.Image()}
              <div>{tab.tabName}</div>
            </div>
          );
        })}
      </div>

      <div
        className={`flex relative not-italic justify-end font-medium text-[16px] ${styles.infoTab}`}
      >
        <div className="hover:text-[#000000]">
          <button onClick={handlePLGClick}>
          <Typewriter
              options={{
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .callFunction(() => {
                    document.getElementsByClassName(
                      "Typewriter"
                    )[0].style.display = "flex";
                    document.getElementsByClassName(
                      "Typewriter"
                    )[0].style.width = "228px";
                  })
                  .typeString("Made with 🧡 by True Sparrow")
                  .callFunction(() => {
                    document.getElementsByClassName(
                      "Typewriter__cursor"
                    )[0].innerHTML = "";
                  })
                  .pauseFor(5000)
                  .callFunction(() => {
                    document.getElementsByClassName(
                      "Typewriter__cursor"
                    )[0].innerHTML = "|";
                  })
                  .deleteAll()
                  .callFunction(() => {
                    document.getElementsByClassName(
                      "Typewriter"
                    )[0].style.display = "flex";
                    document.getElementsByClassName(
                      "Typewriter"
                    )[0].style.width = "211px";
                  })
                  .typeString("Need help building on Lens?")
                  .callFunction(() => {
                    document.getElementsByClassName(
                      "Typewriter__cursor"
                    )[0].innerHTML = "";
                  })
                  .pauseFor(60000)
                  .callFunction(() => {
                    document.getElementsByClassName(
                      "Typewriter__cursor"
                    )[0].innerHTML = "|";
                  })
                  .start();
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
