import React from "react";
import styles from "./generateImageBox.module.css";
import WhisperImage from "../WhisperImage";
import { motion } from "framer-motion";
import Modal from "react-modal";
import MessageLogo from "../../assets/addWhisperLogos/MessageLogo";
import CollectLogo from "../../assets/addWhisperLogos/CollectLogo";
import WalletLogo from "../../assets/addWhisperLogos/WalletLogo";
import SignInModal from "../SignInModal";
import { getChainWhispers } from "../../utils/Utils";
import ImageLoader from "../WhisperImage/ImageLoader";

export default function GeneratedImageBox({
  imgSrcUrl,
  clickHandler,
  setDisableGeneration,
  chainId,
}) {
  const [isHover, setIsHover] = React.useState(false);
  const [isImageLoaded, setIsImageloaded] = React.useState(false);
  const [addToChainClicked, setAddToChainClicked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [errorOccured, setErrorOccured] = React.useState(false);
  const paginationParams = React.useRef({
    page: 1,
    limit: 1,
  });
  const [disableAddToChainbtn, setDisableAddToChainbtn] = React.useState();

  const handleClose = () => {
    setOpen(false);
  };

  // React.useEffect(() => {
  //   if (publication?.pubId) {
  //     const profileIdForGeneratedPost = publication?.comments?.[0]?.profileId;
  //     const loggedInUserProfileId = localStorage.getItem("profileId");
  //     if (profileIdForGeneratedPost === loggedInUserProfileId) {
  //       setDisableGeneration(true);
  //       setOpen(false);
  //     }
  //   }
  // }, []);

  const handleOpen = async () => {
    if (window.localStorage.getItem("profileId")) {
      setSignInOpen(false);
      const whisperRes = await getChainWhispers(
        chainId,
        paginationParams.current
      );
      const whisperIds = whisperRes?.whisper_ids;
      const whisper = whisperRes?.whispers[whisperIds[0]];
      const profileIdForGeneratedPost =
        whisperRes?.users[whisper?.user_id]?.platform_user_id;
      const loggedInUserProfileId = localStorage.getItem("profileId");
      if (profileIdForGeneratedPost === loggedInUserProfileId) {
        setDisableGeneration(true);
        setOpen(false);
        setDisableAddToChainbtn(true);
      } else {
        setDisableAddToChainbtn(false);
        setDisableGeneration(false);
        setOpen(true);
      }
    } else {
      setSignInOpen(true);
    }
  };
  const customStyles = {
    content: {
      background: "#FFFFFF",
      height: "fit-content",
      width: 384,
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
    <div
      className={`tablet:w-[320px] tablet:h-[320px] w-[400px] h-[400px] relative ${styles.generateImage}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <WhisperImage
        imgSrcUrl={imgSrcUrl}
        alt="Whisper Image"
        width={404}
        height={404}
        onLoadingCompleteHandler={() => setIsImageloaded(true)}
        classes="absolute rounded-[16px] border-solid border-[1px] border-[#ffffff33]"
        setErrorOccured={setErrorOccured}
      />
      {isImageLoaded && imgSrcUrl && !errorOccured && (
        <div
          className={`absolute bottom-0 w-[calc(100%-32px)] left-[16px] flex  ${
            disableAddToChainbtn ? "cursor-default " : "cursor-pointer"
          } `}
          onClick={handleOpen}
        >
          <motion.div
            className="w-full"
            transition={{
              type: "spring",
              damping: 100,
              stiffness: 500,
              easing: "easeIn",
            }}
            initial={{
              y: "0%",
            }}
            animate={{
              y: !isHover ? "0%" : "-50%",
            }}
          >
            {isHover && (
              <div className={`${styles.addToChainButton}`}>
                <div className={styles.addToChainBtnText}>+ Add to chain</div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      <Modal onRequestClose={handleClose} isOpen={open} style={customStyles}>
        <div
          className={`flex flex-col justify-start items-start bg-[#FFFFFF] rounded-[16px] backdrop-blur-3xl gap-[16px] p-[12px]`}
        >
          <div className={`text-[20px] ${styles.ModalContainer}`}>
            Adding a whisper to the chain
          </div>
          <div className="flex flex-col gap-[24px] py-[10px] text-start not-italic text-[16px] leading-[140%] -tracking-[0.02em] text-[#000000] font-medium">
            <div className="flex flex-col gap-[11px]">
              <MessageLogo />
              <span className={`flex  ${styles.MessageText}`}>
                When you add a whisper to the chain, a comment is created on our
                lens thread
              </span>
            </div>
            <div className="flex flex-col gap-[11px]">
              <CollectLogo />
              <span className={`flex ${styles.MessageText}`}>
                {" "}
                People can collect your comment on Whisperchain and lens
              </span>
            </div>
            <div className="flex flex-col gap-[11px]">
              <WalletLogo />
              <span className={`flex ${styles.MessageText}`}>
                {" "}
                Proceeds from all collects will go to your wallet
              </span>
            </div>
          </div>
          <div
            className="flex gap-[8px] w-full justify-start items-center"
            onClick={() => {
              setAddToChainClicked(true);
              clickHandler();
            }}
          >
            <div
              className={`${styles.addToChainButton} ${
                addToChainClicked
                  ? "opacity-50 cursor-not-allowed	pointer-events-none"
                  : ""
              } cursor-pointer`}
            >
              {addToChainClicked ? (
                <ImageLoader height={24} width={24} />
              ) : (
                <div className={styles.addToChainBtnText}>+ Add to chain</div>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <SignInModal
        onRequestClose={() => {
          setSignInOpen(false);
        }}
        isOpen={signInOpen}
        onSignInComplete={handleOpen}
      />
    </div>
  );
}
