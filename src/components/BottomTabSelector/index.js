import InfoLogo from "../../assets/InfoLogo";
import { useRouter } from "next/router";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.css";
import React from "react";
import { usePublicationContext } from "../../context/PublicationContext";
import Typewriter from "typewriter-effect";
import { TwitterShareButton } from "react-share";
import QuestionMarkIcon from "../../assets/QuestionMarkIcon";
import TwitterIcon from "../../assets/TwitterIcon";
import GitHubIcon from "../../assets/GitHubIcon";
import TwitterIconBlue from "../../assets/TwitterIconBlue";
import GitHubIconWhite from "../../assets/GitHubIconWhite";
import QuestionMarkIconBlack from "../../assets/QuestionMarkIconBlack";

export default function BottomTabSelector() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isGitHovered, setIsGitHovered] = React.useState(false);
  const [isQueHovered, setIsQueHovered] = React.useState(false);
  const { currentTab, onTabChange } = useBottomTab();
  const { publication } = usePublicationContext();
  const handlePLGClick = () => {
    const plgURL = "https://truesparrow.com/";
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

  const handleHowItWorks = () => {
    const plgURL =
      "https://www.notion.so/truesparrow/Whisper-Chain-fc95cbdc8f9a4a41b87747a190477a61";
    window.open(plgURL, "_blank");
  };

  const handleGithub = () => {
    const gitHubUrl = "https://github.com/WhisperChain";
    window.open(gitHubUrl, "_blank");
  };

  return (
    <div
      className={`flex w-full justify-between items-center ${styles.mainContainer}`}
    >
      <div
        className={`${styles.leftBar} flex items-center mt-[12px] md:mt-0 justify-items-start`}
      >
        <button
          className={`${styles.howItWorks} flex items-center cursor-pointer relative`}
          onClick={handleHowItWorks}
          onMouseEnter={() => setIsQueHovered(true)}
          onMouseLeave={() => setIsQueHovered(false)}
        >

          <span className="flex items-center" >
            {
              isQueHovered ?
                <QuestionMarkIconBlack /> :
                <QuestionMarkIcon />
            }

          </span>
          <div
            className={`${styles.hiwText} text-[#000000] bottom-[0px] flex items-center font-medium absolute w-[100px] left-[25px] top-0`}
          >
            How it works
          </div>
          <div className={styles.hiwSpace}></div>
        </button>

        <TwitterShareButton
          className={`${styles.twitterShare} cursor-pointer ml-[15px] flex`}
          url={"https://whisperchain.xyz/"}
          title={"I've found this 🔥 game, check it out now!"}
        >
          <span className="z-10 pl-[5px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            {
              isHovered ?
                <TwitterIconBlue /> :
                <TwitterIcon />
            }
          </span>
          <span
            className={`${styles.twitterText} pl-[15px] flex items-center bottom-[10px] text-[#000000] opacity-60 font-medium absolute ml-[20px]`}
          >
            Share on Twitter
          </span>
          <div className={styles.twitterTextSpace}></div>
        </TwitterShareButton>

        <button
          className={`${styles.githubShare} justify-center items-center cursor-pointer ml-[15px] flex`}
          onClick={handleGithub}
          onMouseEnter={() => setIsGitHovered(true)}
            onMouseLeave={() => setIsGitHovered(false)}
        >
          <span className="z-10 pl-[5px]" >
            {
              isGitHovered ?
                <GitHubIconWhite /> :
                <GitHubIcon />
            }

          </span>
          <div
            className={`${styles.githubText} flex items-center pl-[5px] text-[#000000] opacity-60 font-medium`}
          >
            Github
          </div>
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
              className={`${styles.tabContainer} ${isSelected ? styles.selectedTab : styles.notSelectedTab
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
