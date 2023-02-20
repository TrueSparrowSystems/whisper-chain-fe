import React from "react";
import BackIcon from "../assets/BackIcon";
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
                "Welcome to Whisper Chain",
            subTitle: "A new fun take on age old game some of you might know as Chinese whisper or Telephone. But with a twist of A.I.",
            src: "https://static.staging.whisperchain.xyz/whisperHomePage/onboarding-vid-1.mp4",
            type: "video/mp4"
        },
        {
            title:
                "Built on Lens",
            subTitle: "Own your content. Own your social graph. Own your data. Lens Protocol is a composable and decentralized social graph. ",
            learn: "Learn more",
            src: "https://static.staging.whisperchain.xyz/whisperHomePage/onboarding-vid-2.mp4",
            type: "video/mp4"
        },
        {
            title:
                "Support creativity",
            subTitle: "Collect unique generations that people added to the chain to show your support! ",
            src: "https://static.staging.whisperchain.xyz/whisperHomePage/onboarding-vid-3.mp4",
            type: "video/mp4"
        },
        {
            title:
                "Support creators",
            subTitle: "Collect unique generations that people added to the chain to show your support! ",
            src: "https://static.staging.whisperchain.xyz/whisperHomePage/support-creators-img.png",
            type: "video/mp4"
        },
        {
            title:
                "Join the fun",
            subTitle: "Recreate the last image added to the chain by using the A.I. generation tool on our platform. ",
            src: "https://static.staging.whisperchain.xyz/whisperHomePage/join-in-the-fun.mp4",
            type: "video/mp4"
        },
    ];

    console.log(onBoardingDetailsArray[index].src)

    return (
        <div
            className={`tablet:w-[400px] tablet:h-[400px] w-[512px] h-[512px] ${styles.MessageBox}`}
        >
            <div className={`tablet:h-full tablet:w-auto h-[280px] w-[510px] ${styles.videoContainer}`}>
                {index === 3 ? <img
                    alt="Stack Image 3"
                    className="rounded-t-[16px]"
                    fill
                    src={onBoardingDetailsArray[index].src}
                /> :
                    <video autoPlay muted loop className="rounded-t-[16px]"
                        height={280} key={onBoardingDetailsArray[index].src}>
                        <source src={onBoardingDetailsArray[index].src} type={onBoardingDetailsArray[index].type} />
                    </video>
                }

                <div className={`${styles.cardGradient}`}>
                </div>

            </div>
            <div>
                <p className="text-[20px] tablet:text-[16px]  font-bold text-[#000000] tablet:pt-[4px] pt-[16px] px-[20px]">{onBoardingDetailsArray[index].title}</p>
                <p className="text-[16px] tablet:text-[14px] text-[#000000] opacity-80 pt-[4px] px-[20px]">{onBoardingDetailsArray[index].subTitle}</p>
                <p className={`px-[20px] pt-[4px] ${styles.learnMore}`}><a href="https://www.lens.xyz/" className={`cursor-pointer ${styles.learnMoreLink}`}>{onBoardingDetailsArray[index].learn}</a></p>
                <div>
                    {index === 0 &&
                        <div className="flex justify-center mt-[72px] tablet:mt-[30px] tablet:px-[20px] w-full">
                            <button
                                className={`${styles.nextButton}`}
                                onClick={() => {
                                    setIndex(index + 1);
                                }}>Next</button>
                        </div>
                    }
                    {index > 0 && index <= 3 ?
                        <div className={index == 1 ? "flex items-center justify-between tablet:mt-[0px] mt-[47px] px-[20px]" : "flex items-center justify-between tablet:mt-[34px] mt-[72px] px-[20px]"}>
                            <button
                                className={`flex items-center ${styles.backOnboard}`}
                                onClick={() => {
                                    setIndex(index - 1);
                                }}>
                                <BackIcon />
                                <span className="ml-[15px] text-black opacity-40 hover:opacity-60"> Back</span>
                            </button>
                            <button
                                className={`tablet:h-[32px] w-[180px] ${styles.nextButtonOnboard}`}
                                onClick={() => {
                                    setIndex(index + 1);
                                }}>Next</button>
                        </div> : <div> </div>
                    }
                    {index === 4 &&
                        <div className="flex justify-center mt-[72px] px-[20px] tablet:mt-[20px] w-full">
                            <button
                                className={`${styles.nextButton}`}
                                onClick={() => {
                                    setIndex(index + 1);
                                    if (index === 4) {
                                        window.localStorage.setItem("onBoardingKey", false);
                                        setOnBoarding(false);
                                    }
                                }}>Get Started</button>
                        </div>
                    }
                    {index === 1 ?
                        <div className="flex justify-center tablet:pt-[10px] pt-[6px]">
                            <span className={`mr-[5px] ${styles.bottomBorderBlue}`}></span>
                            <span className={` mr-[5px] ${styles.bottomBorder}`}></span>
                            <span className={`${styles.bottomBorder}`}></span>
                        </div> : index === 2 ?
                            <div className="flex justify-center tablet:pt-[10px]  pt-[6px]">
                                <span className={`mr-[5px] ${styles.bottomBorderBlue}`}></span>
                                <span className={` mr-[5px] ${styles.bottomBorderBlue}`}></span>
                                <span className={`${styles.bottomBorder}`}></span>
                            </div> : index === 3 &&
                            <div className="flex justify-center tablet:pt-[10px]  pt-[6px]">
                                <span className={`mr-[5px] ${styles.bottomBorderBlue}`}></span>
                                <span className={` mr-[5px] ${styles.bottomBorderBlue}`}></span>
                                <span className={`${styles.bottomBorderBlue}`}></span>
                            </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default Onboarding;
