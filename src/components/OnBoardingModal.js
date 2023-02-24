import React from "react";
import styles from "./HomeMessage.module.css";
import Modal from "react-modal";
import BackIcon from "../assets/BackIcon";
import PurpleCollectLogo from "../assets/PurpleCollectLogo";
import PurpleGenerateLogo from "../assets/PurpleGenerateIcon";
import CrossIcon from "../assets/CrossIcon";

const OnBoardingModal = ({
    onRequestClose,
    isOpen,
    setOnBoarding
}) => {
    //tablet view
    const [isTablet, setIsTablet] = React.useState();

    const [open, setOpen] = React.useState(false);
    const handleResize = () => {
        if (window.innerWidth < 1200) {
            setIsTablet(true);
        } else {
            setIsTablet(false);
        }
    };

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        handleModalOpen();
        window.addEventListener("resize", handleResize);
    });

    const [index, setIndex] = React.useState(0);
    const onBoardingDetailsArray = [
        {
            title:
                "Welcome to Whisper Chain",
            subTitle: "A new fun take on age old game some of you might know as Chinese whisper or Telephone. But with a twist of A.I.",
            src: `${process.env.NEXT_PUBLIC_AWS_CDN_URL}/whisperHomePage/onboarding-vid-1.mp4`,
            type: "video/mp4"
        },
        {
            title:
                "Built on Lens",
            subTitle: "Own your content. Own your social graph. Own your data. Lens Protocol is a  and decentralized social graph. ",
            learn: "Learn more",
            src: `${process.env.NEXT_PUBLIC_AWS_CDN_URL}/whisperHomePage/onboarding-vid-2.mp4`,
            type: "video/mp4"
        },
        {
            title:
                "Support creativity",
            subTitle: "Collect unique generations that people added to the chain to show your support! ",
            src: `${process.env.NEXT_PUBLIC_AWS_CDN_URL}/whisperHomePage/onboarding-vid-3.mp4`,
            type: "video/mp4",
            ctaText: "Collect",
            svg: <PurpleCollectLogo />
        },
    ]

    const customStyles = {
        content: {
            background: "#FFFFFF",
            height: "fit-content",
            width: "fit-content",
            margin: "auto",
            backdropFilter: "blur(60px)",
            borderRadius: "16px",
            padding: "0px",
        },
        overlay: {
            background: "rgba(0, 0, 0, 0.6)",
        },
    };

    return (
        <>
            <Modal
                onRequestClose={onRequestClose}
                isOpen={open}
                style={customStyles}
            >
                <div
                    id="onboardingmodal"
                    className={`tablet:w-[400px] tablet:h-[400px] w-[512px] h-[512px] ${styles.MessageBox}`}
                >
                    <div className={`${styles.crossIcon} cursor-pointer absolute z-10  h-[24px] w-[24px] p-[4px] right-[5px] top-[5px] rounded-[16px]`}
                        onClick={() => {
                            console.log("clicked")
                                window.localStorage.setItem("onBoardingKey", false);
                                setOnBoarding(false);
                                handleModalClose();
                        }}
                    >
                        <CrossIcon />
                    </div>
                    <div className={`tablet:h-full tablet:w-auto h-[280px] w-[510px] ${styles.videoContainer}`}>
                        <video autoPlay muted loop className="rounded-t-[16px]"
                            height={280} key={onBoardingDetailsArray[index].src}>
                            <source src={onBoardingDetailsArray[index].src} type={onBoardingDetailsArray[index].type} />
                        </video>
                        {index > 0 &&
                            <div className={`${styles.cardGradient}`}>
                                {index > 1 &&
                                    <div className={`${styles.videoCtaSection}`}>
                                        <button className={`flex ${styles.videoCta}`}>
                                            <span className="mr-[5px]"> {onBoardingDetailsArray[index].svg}  </span>
                                            <span>{onBoardingDetailsArray[index].ctaText}</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <div>
                        <p className="text-[20px] tablet:text-[16px]  font-bold text-[#000000] tablet:pt-[4px] pt-[16px] px-[20px]">{onBoardingDetailsArray[index].title}</p>
                        <p className="text-[16px] tablet:text-[14px] text-[#000000] opacity-80 pt-[4px] px-[20px]">{onBoardingDetailsArray[index].subTitle}</p>
                        <p className={`px-[20px] pt-[4px] ${styles.learnMore}`}><a href="https://www.lens.xyz/" target="_blank" className={`cursor-pointer ${styles.learnMoreLink}`}>{onBoardingDetailsArray[index].learn}</a></p>
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
                            {index > 0 && index <= 1 ?
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
                                </div> : <div></div>
                            }
                            {index === 2 &&
                                <div className="flex justify-center mt-[72px] px-[20px] tablet:mt-[20px] w-full">
                                    <button
                                        className={`${styles.nextButton}`}
                                        onClick={() => {
                                            setIndex(index + 1);
                                            if (index === 2) {
                                                window.localStorage.setItem("onBoardingKey", false);
                                                setOnBoarding(false);
                                                handleModalClose();
                                            }
                                        }}>Get Started</button>
                                </div>
                            }
                            {index === 1 &&
                                <div className="flex justify-center tablet:pt-[10px] pt-[6px]">
                                    <span className={`mr-[5px] ${styles.bottomBorderBlue}`}></span>
                                    <span className={` mr-[5px] ${styles.bottomBorder}`}></span>
                                </div>
                            }
                            {
                                index === 2 &&
                                <div className="flex justify-center tablet:pt-[10px]  pt-[6px]">
                                    <span className={`mr-[5px] ${styles.bottomBorderBlue}`}></span>
                                    <span className={` mr-[5px] ${styles.bottomBorderBlue}`}></span>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    );
};

export default OnBoardingModal;
