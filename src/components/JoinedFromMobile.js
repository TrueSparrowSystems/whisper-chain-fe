import React from "react";
import styles from "./JoinedFromMobile.module.css";
import Logo from "../assets/Logo";
import Typewriter from "typewriter-effect";
import QuestionMarkIcon from "../assets/QuestionMarkIcon";
import QuestionMarkIconBlack from "../assets/QuestionMarkIconBlack";

export default function JoinedFromMobile() {
  const handlePLGClick = () => {
    const plgURL = "https://plgworks.com/";
    window.open(plgURL, "_blank");
  };

  const handleHowItWorks = () => {
    const plgURL =
      "https://www.notion.so/truesparrow/Whisper-Chain-fc95cbdc8f9a4a41b87747a190477a61";
    window.open(plgURL, "_blank");
  };

  const [isQueHovered, setIsQueHovered] = React.useState(false);

  return (
    <>
      <div className="flex justify-center pt-[40px]">
        <Logo />
      </div>
      <div className={`m-[20px] ${styles.mobileCardSection}`}>
        <div className={`${styles.mobileCardWrapper}`}>
          <video autoPlay muted loop>
            <source src="https://static.whisperchain.xyz/whisperHomePage/mobile-background.mp4" type="video/mp4" />
          </video>
          <div className={`text-center pt-[30px] px-[10px] ${styles.mobileCardInfo}`}>
            <h1 className="font-bold text-[20px] text-[#000000]">Welcome to WhisperChain</h1>
            <p className="text-[16px] leading-[160%] p-[10px]">A new fun take on age old game some of you might know as Chinese whisper or Telephone. But with a twist of A.I.</p>
            <p className="font-bold pt-[20px]">This experience is best viewed on bigger screen sizes.</p>
            <div className="flex justify-center pt-[10px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 5.00001H12.5M4 4V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V4.00001C16 2.89544 15.1046 2.00001 14 2.00001L6 2C4.89543 2 4 2.89543 4 4ZM10 14H10.0708V14.0641H10V14Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17.0254L16.5 2.52539" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 15.5L16.5 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={`relative bottom-[80px]`}>
          <button
            className={`${styles.howItWorks} cursor-pointer relative left-[18%]`}
            onClick={handleHowItWorks}
            onMouseEnter={() => setIsQueHovered(true)}
            onMouseLeave={() => setIsQueHovered(false)}
          >
            <span className="flex items-center">
              {isQueHovered ? <QuestionMarkIconBlack /> : <QuestionMarkIcon />}
            </span>
            <div
              className={`${styles.hiwText} text-[#000000] bottom-[0px] flex items-center font-medium absolute w-[100px] left-[25px] top-0`}
            >
              How it works
            </div>
            <div className={styles.hiwSpace}></div>
          </button>
        </div>
        <div className={`relative bottom-[30px]`}>
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
                    )[0].style.width = "213px";
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
    </>
  );
}
