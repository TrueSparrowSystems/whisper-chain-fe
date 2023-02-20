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
        },
        {
            title:
                "Built on Lens",
            subTitle: "Own your content. Own your social graph. Own your data. Lens Protocol is a composable and decentralized social graph. ",
            learn: "Learn more",
        },
        {
            title:
                "Support creativity",
            subTitle: "Collect unique generations that people added to the chain to show your support! ",
        },
        {
            title:
                "Support creators",
            subTitle: "Collect unique generations that people added to the chain to show your support! ",
        },
        {
            title:
                "Join the fun",
            subTitle: "Recreate the last image added to the chain by using the A.I. generation tool on our platform. ",
        },
    ];

    return (
        <div
      className={ index >= 0 && index < 2 ? `tablet:w-[400px] tablet:h-[400px] w-[512px] h-[512px] ${styles.MessageBox}` : `tablet:w-[400px] tablet:h-[400px] w-[512px] h-[512px] ${styles.supportCreativity}` }
    >
            <div className="tablet:h-full tablet:w-auto h-[280px] w-[510px]">
                {/* {index === 0 &&
                    <video autoPlay muted loop className="rounded-t-[16px]"
                        height={280}>
                        <source src="https://static.staging.whisperchain.xyz/whisperHomePage/onboarding-v1.mp4" type={onBoardingDetailsArray[index].type} />
                    </video>
                }
                {index === 1 &&
                    <video autoPlay muted loop className="rounded-t-[16px]"
                        height={280}>
                        <source src="https://static.staging.whisperchain.xyz/whisperHomePage/onboarding-v2.mp4" type={onBoardingDetailsArray[index].type} />
                    </video>
                }
                {index === 2 &&
                    <video autoPlay muted loop className="rounded-t-[16px]"
                        height={280}>
                        <source src="https://static.staging.whisperchain.xyz/whisperHomePage/Support-Creativity.mp4" type={onBoardingDetailsArray[index].type} />
                    </video>
                }
                {index === 3 &&
                    <img
                        alt="Stack Image 3"
                        className="rounded-t-[16px]"
                        fill
                        src="https://static.staging.whisperchain.xyz/whisperHomePage/support-creator.png"
                    />
                }
                {index == 4 &&
                    <video autoPlay muted loop className="rounded-t-[16px]">
                        <source src="https://static.staging.whisperchain.xyz/whisperHomePage/onboarding-v5.mp4" type={onBoardingDetailsArray[index].type} />
                    </video>
                } */}
            </div>
            <div className="transition-property: transform transition-duration: 2s;">
                <p className="text-[20px] tablet:text-[16px]  font-bold text-[#000000] tablet:pt-[4px] pt-[16px] px-[20px]">{onBoardingDetailsArray[index].title}</p>
                <p className="text-[16px] tablet:text-[14px] text-[#000000] opacity-80 pt-[4px] px-[20px]">{onBoardingDetailsArray[index].subTitle}</p>
                <p className={`px-[20px] pt-[4px] ${styles.learnMore}`}><a href="https://www.lens.xyz/" className="cursor-pointer border-b-1">{onBoardingDetailsArray[index].learn}</a></p>
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
