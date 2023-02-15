import React from "react";
import styles from "./HomeMessage.module.css";


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
            src: "https://static.staging.whisperchain.xyz/whisperHomePage/mobile-background.mp4",
            type: "video/mp4"
        },
        {
            src: "https://static.staging.whisperchain.xyz/whisperHomePage/onboarding-v2.mp4",
            title:
                "Built on Lens",
            subTitle: "Own your content. Own your social graph. Own your data. Lens Protocol is a composable and decentralized social graph. ",
            type: "video/mp4"
        },
        {
            title:
                "Support creativity",
            subTitle: "Collect unique generations that people added to the chain to show your support! ",
            src: "https://static.staging.whisperchain.xyz/whisperHomePage/onboarding-v3.mp4",
            type: "video/mp4"
        },
        {
            title:
                "Support creators",
            subTitle: "Collect unique generations that people added to the chain to show your support! ",
            src: "https://static.staging.whisperchain.xyz/whisperHomePage/onboarding-v3.mp4",
            type: "video/mp4"
        },
    ];

    return (
        <div>
            <video autoPlay muted loop className="rounded-t-[20px]">
                <source src={onBoardingDetailsArray[index].src} type={onBoardingDetailsArray[index].type} />
            </video>
            <div className="p-[30px]">
                <p className="text-[20px] font-bold text-[#000000]">{onBoardingDetailsArray[index].title}</p>
                <p className="text-[16px] text-[#000000] opacity-80 pt-[5px]">{onBoardingDetailsArray[index].subTitle}</p>
                <div className="flex justify-center mt-[50px] tablet:mt-[20px] w-full">
                    <button 
                   className= {`${styles.nextButton}`} 
                     onClick={() => {
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
