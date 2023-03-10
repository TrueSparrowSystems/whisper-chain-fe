import React from "react";
import ProfileLogo from "../assets/ProfileLogo";
import Image from "next/image";
import styles from "./ImageStack.module.css";
import CollectIcon from "../assets/CollectIcon";
import {
  collectPost,
  getApprovedModuleAllowance,
  refreshAuthentication,
  getPublicationCollectData,
} from "../utils/lensFunction";
import { useSigner } from "wagmi";
import SignTypedData from "./ConnectButton/SignTypedData";
// import FollowButton from "./FollowButton";
import SignInModal from "./SignInModal";
import { Constants } from "../utils/Constants";
import Cross from "../assets/Cross";
import PolygonLogo from "../assets/PolygonLogo";
import CollectorLogo from "../assets/CollectorLogo";
import CollectButton from "./CollectButton";
import AlertIcon from "../assets/AlertIcon";
import SpinningLoader from "./SpinningLoader";
import Loader from "./Loader";
import { useRouter } from "next/router";
import { getChainWhispers } from "../utils/Utils";
import ImageLoader from "./WhisperImage/ImageLoader";
import WhiteEyeIcon from "../assets/WhiteEyeIcon";
import toast from "react-hot-toast";
import GreenEyeIcon from "../assets/GreenEyeIcon";
import LoaderSvgIcon from "../assets/loaderSvgIcon";

export const PostImage = ({ imageDetails, chainId }) => {
  const [hovered, setHovered] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const { data: signer } = useSigner();
  const [typedData, setTypedData] = React.useState({});
  const transactionId = React.useRef({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [onClickCollect, setOnClickCollect] = React.useState(false);
  const [collectError, setCollectError] = React.useState(false);
  const router = useRouter();
  const routerPath = router.query;
  const paginationParams = React.useRef({
    page: 1,
    limit: 1,
  });
  // const chainId = routerPath.chainId;
  const [collectLoaderStarted, setCollectLoaderStarted] = React.useState(false);

  const notify = (notifyText) =>
    toast.custom((t) => (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave"
          } max-w-md bg-white shadow-lg rounded-[16px] pointer-events-auto flex justify-center items-center ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 p-4">
          <div className="flex items-center">
            <p className="ml-[10px] text-[14px] text-[#000000] opacity-80">
              {notifyText}
            </p>
          </div>
        </div>
      </div>
    ));

  // console.log("imageDetails", imageDetails);
  const onCollectPress = async () => {
    if (
      window.localStorage.getItem(Constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY)
    ) {
      setIsOpen(false);
      try {
        await refreshAuthentication();
        await getApprovedModuleAllowance(imageDetails?.collectModule, signer);
        const res = await collectPost(imageDetails?.publicationId);
        transactionId.current = res.data?.createCollectTypedData?.id;
        setTypedData(res.data?.createCollectTypedData?.typedData);
      } catch (error) {
        if (error) {
          setCollectLoaderStarted(false);
          setCollectError(true);
        }
      }
      setOnClickCollect(false);
    } else {
      setIsOpen(true);
      setOnClickCollect(true);
    }
  };

  // polling for processing state
  let timeout = null;
  let isPollingStarted = false;
  const hasWhisperProcessed = async () => {
    // console.log("chain id", chainId);
    const whisperRes = await getChainWhispers(
      chainId,
      paginationParams.current
    );
    // console.log("-------------", whisperRes);
    const whisperIds = whisperRes?.whisper_ids;
    const whisper = whisperRes?.whispers[whisperIds[0]];
    // console.log(whisper);
    return whisper;
  };

  const [isImageLoaded, setIsImageloaded] = React.useState(false);

  const onLoadCompleteHandler = () => {
    setIsImageloaded(true);
  };

  React.useEffect(() => {
    if (
      routerPath?.isGenerated == "true" &&
      imageDetails.status === "PROCESSING" &&
      !isPollingStarted
    ) {
      isPollingStarted = true;
      timeout = setInterval(async () => {
        const whisper = await hasWhisperProcessed();
        // console.log({ whisperStatus: whisper?.status });
        if (whisper?.status === "ACTIVE") {
          clearInterval(timeout);
          imageDetails.status = whisper?.status;
          imageDetails.publicationId = whisper?.platform_chain_id;
          const res = await getPublicationCollectData([
            whisper?.platform_chain_id,
          ]);
          imageDetails.hasCollectedByMe =
            res[whisper?.platform_chain_id]?.hasCollectedByMe;
          imageDetails.totalAmountOfCollects =
            res[whisper?.platform_chain_id]?.stats?.totalAmountOfCollects;
          imageDetails.lensterPostUrl = `https://testnet.lenster.xyz/posts/${whisper.platform_chain_id}`;
        }
      }, 5000);
    }
  }, [imageDetails.status]);

  return (
    <>
      <div className="flex flex-col items-center relative overflow-hidden">
        <div>
          {
            !isImageLoaded &&
            <div className={`flex items-center tablet:h-[320px] tablet:w-[320px]  h-[512px] w-[512px] justify-center z-10`}>
              <LoaderSvgIcon className="h-[24px] w-[24px]" />
            </div>
          }
          <Image
            src={imageDetails.imageUrl}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            alt="Chain Image"
            onLoadingComplete={onLoadCompleteHandler}
            width={512}
            height={512}
            className="relative flex z-[3] rounded-[48px]"
          />
        </div>
        {hovered && (
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`w-[512px] h-[512px] absolute z-[10] rounded-[48px]`}
          >
            <div
              className={`flex relative p-[40px] rounded-tr-[48px] rounded-tl-[48px]  backdrop-blur-[2px] ${styles.backdrop} `}
            >
              <div className={`flex w-[360px]`}>
                <ProfileLogo profileImageUrl={imageDetails?.profileImageUrl} />
                <div className="ml-[5px] flex flex-col justify-center items-start gap-[4px]">
                  <div
                    className={`not-italic leading-[100%] text-[#FFFFFF] font-bold text-[14px] ${styles.name}`}
                  >
                    {imageDetails?.name || "Lewis"}
                  </div>
                  <div
                    className={`not-italic font-normal text-[14px] leading-[100%] text-[#FFFFFF] ${styles.Handle}`}
                  >
                    {"@" + imageDetails?.profileHandle || "Lewis.xyz"}
                  </div>
                </div>
              </div>
            </div>

            {/* collector modal */}
            {onClickCollect && (
              <div
                className={`box-border flex flex-col p-[24px] gap-[14px] absolute rounded-[8px] backdrop-blur-[60px] ${styles.collectModal}`}
              >
                <div className="flex justify-center items-center">
                  <div className="flex gap-[8px] justify-center items-center">
                    <CollectIcon />
                    <span className="w-[360px] text-[16px] leading-[160%] font-bold">
                      Fee Collect
                    </span>
                  </div>
                  <div
                    onClick={() => setOnClickCollect(false)}
                    className="cursor-pointer"
                  >
                    <Cross type={"large"} stroke="#000000" />
                  </div>
                </div>
                <div
                  className={`font-medium text-[16px] leading-[160%] ${styles.collectInfo}`}
                >
                  Proceeds from the Collect will go to
                  <span className="text-[#000000]">
                    {" "}
                    @{imageDetails?.profileHandle}
                  </span>
                </div>
                <div
                  className={`flex box-border px-[12px] py-[7px] gap-[8px] rounded-[4px] text-[16px] font-bold leading-[160%] text-[#000000] ${styles.collectAmount}`}
                >
                  {/* <PolygonLogo /> */}
                  <Image
                    src={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/whisperHomePage/polygonIcon.png`}
                    width={26}
                    height={26}
                    alt="Matic symbol"
                  />
                  1 WMATIC
                </div>
                <div
                  className={`flex box-border px-[12px] py-[7px] gap-[8px] rounded-[4px] items-center ${styles.totalCollector}`}
                >
                  <CollectorLogo />
                  {imageDetails?.totalAmountOfCollects} Collectors
                </div>
                <CollectButton
                  onCollectPress={onCollectPress}
                  text={"Collect now"}
                />
              </div>
            )}
            {/* collector error modal */}
            {collectError && (
              <div
                className={`p-[24px] gap-[14px] w-[464px] absolute rounded-[8px] backdrop-blur-[60px] ${styles.collectModal}`}
              >
                <div className="flex gap-[8px] items-center">
                  <AlertIcon />
                  <span className="w-[360px] text-[20px] leading-[160%] font-bold text-[#260707]">
                    Couldn’t Collect post
                  </span>
                </div>
                <div
                  className={`font-medium text-[16px] leading-[160%] pb-[106px] text-[#390808]`}
                >
                  The message signature was denied.
                </div>
                <div
                  className={`w-full min-w-[156px] h-[40px] rounded-[40px] flex items-center justify-center z-10 cursor-pointer gap-[8px] ${styles.Buttonbg}`}
                  onClick={() => {
                    setCollectError(false);
                  }}
                >
                  <div
                    className={`not-italic font-bold text-[16px] leading-[160%] text-center text-[#FFFFFF] py-[7px]${styles.ButtonText}`}
                  >
                    Ok. Got it.
                  </div>
                </div>
              </div>
            )}
            {imageDetails.status === "PROCESSING" && (
              <div
                className={`flex flex-col justify-center items-center absolute top-[85%] left-[50%] text-center gap-[8px] w-[432px] -translate-x-[50%]`}
              >
                <div
                  className={`flex items-center p-[10px] w-full relative bottom-[25px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] ${styles.viewOnLensBtn}`}
                >
                  <ImageLoader height={24} width={24} />
                </div>
                <div
                  className={`flex items-center p-[10px] w-full relative bottom-[25px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] ${styles.viewOnLensBtn}`}
                >
                  <ImageLoader height={24} width={24} />
                </div>
              </div>
            )}
            {imageDetails.status === "ACTIVE" && (
              <div>
                <div
                  className={`flex flex-col justify-center items-center absolute top-[82%] left-[50%] text-center gap-[8px] w-full -translate-x-[50%] rounded-br-[48px] rounded-bl-[48px] ${styles.bottomBackdrop}`}
                >
                  {imageDetails?.hasCollectedByMe ? (
                    <button
                      className={`flex items-center relative bottom-[10px] p-[10px] w-[432px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] cursor-auto ${styles.collectedBtn}`}
                    >
                      Collected
                    </button>
                  ) : (
                    <button
                      onClick={() => setOnClickCollect(true)}
                      className={`flex items-center relative bottom-[10px] p-[10px] w-[432px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] cursor-pointer ${styles.viewOnLensBtn
                        }
                  ${collectLoaderStarted
                          ? "cursor-auto pointer-events-none"
                          : null
                        }
                  `}
                    >
                      {collectLoaderStarted ? (
                        <ImageLoader height={24} width={24} />
                      ) : (
                        <>
                          <CollectIcon />
                          <span className="ml-[10px]">Collect this post</span>
                        </>
                      )}
                    </button>
                  )}
                  <button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                      window.open(imageDetails.lensterPostUrl, "_blank");
                    }}
                    className={`flex items-center relative bottom-[10px] p-[10px] justify-center text-white hover:text-[#7DFA00] opacity-[0.8] hover:opacity-100`}
                  >
                    {
                      isHovered ?
                        <GreenEyeIcon /> :
                        <WhiteEyeIcon />
                    }

                    <span className="ml-[10px]">
                      View on Lens
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <SignInModal
          onRequestClose={() => {
            setIsOpen(false);
          }}
          isOpen={isOpen}
          onSignInComplete={async () => {
            const res = await getPublicationCollectData([
              imageDetails?.publicationId,
            ]);
            imageDetails.hasCollectedByMe =
              res[imageDetails?.publicationId]?.hasCollectedByMe;
            imageDetails.totalAmountOfCollects =
              res[imageDetails?.publicationId]?.stats?.totalAmountOfCollects;
            if (imageDetails?.hasCollectedByMe === false) {
              onCollectPress();
            } else {
              setIsOpen(false);
              setOnClickCollect(false);
              notify("You have already collected this post.");
            }
          }}
        />
        {Object.keys(typedData)?.length > 0 ? (
          <SignTypedData
            typedData={typedData}
            id={transactionId.current}
            onSuccess={async () => {
              setCollectLoaderStarted(false);
              const res = await getPublicationCollectData([
                imageDetails?.publicationId,
              ]);
              imageDetails.hasCollectedByMe =
                res[imageDetails?.publicationId]?.hasCollectedByMe;
              imageDetails.totalAmountOfCollects =
                res[imageDetails?.publicationId]?.stats?.totalAmountOfCollects;
            }}
            pollIndexing={true}
            setCollectLoaderStarted={setCollectLoaderStarted}
            onError={() => {
              notify("Transaction signing was rejected");
            }}
          />
        ) : null}
      </div>
    </>
  );
};
