import React from "react";
import AddWhisperBtn from "./AddWhisperBtn";
import styles from "./HomeMessage.module.css";
import ImageLinkTop from "../assets/ImageLinkTop";
import ImageLinkBottom from "../assets/ImageLinkBottom";
import WhisperImage from "./WhisperImage";
import ImageLinkSmall from "../assets/ImageLinkSmall";

const Onboarding = ({ publication, setOnBoarding }) => {
    //tablet view
    const [isTablet, setIsTablet] = React.useState();
    const handleResize = () => {
        if (window.innerWidth < 1200) {
            setIsTablet(true);
        } else {
            setIsTablet(false);
        }
    };
    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
    });

    const [index, setIndex] = React.useState(0);

    const onBoardingDetailsArray = [
        {
            title:
                "Welcome to Whisper chain",
            subTitle: "A new fun take on age old game some of you might know as Chinese whisper or Telephone. But with a twist of A.I.",
        },
        {
            title:
                "nead 2",
            subTitle: "A new fun take on age old game some of you might know as Chinese whisper or Telephone. But with a twist of A.I.",
        },
        {
            title:
                "nead 3",
            subTitle: "A new fun take on age old game some of you might know as Chinese whisper or Telephone. But with a twist of A.I.",
        },
    ];

    return (
        <div>
            <video autoPlay muted loop className="rounded-t-[20px]">
                <source src="https://static.staging.whisperchain.xyz/whisperHomePage/onboarding-v3.mp4" type="video/mp4" />
            </video>
            <div className="p-[30px]">
                <p className="text-[20px] font-bold text-[#000000]">{onBoardingDetailsArray[index].title}</p>
                <p className="text-[16px] text-[#000000] opacity-80 pt-[5px]">{onBoardingDetailsArray[index].subTitle}</p>
                <div className="flex justify-center mt-[50px] tablet:mt-[20px] w-full">
                    <button onClick={() => {
                        setIndex(index + 1);
                        if (index === 3) {
                            window.localStorage.setItem("onBoardingKey", false);
                            setOnBoarding(false);
                          }
                    }}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
