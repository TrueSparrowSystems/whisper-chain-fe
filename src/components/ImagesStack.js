import React from "react";
import ProfileLogo from "../assets/ProfileLogo";
import { usePublicationContext } from "../context/PublicationContext";
import Image from "next/image";
import styles from "./ImageStack.module.css";
import { useRouter } from "next/router";
import BlackEyeIcon from "../assets/BlackEyeIcon";
// import FollowButton from "./FollowButton";
import { convertIntoIpfsUrl } from "../utils/Utils.js"
import ChainIcon from "../assets/ChainIcon";

const ImagesStack = ({ imageDetails, pub, index, currentSlideIndex }) => {
  const [hovered, setHovered] = React.useState(false);
  const [swipeHovered, setSwipeHovered] = React.useState(false);
  const { setPublication } = usePublicationContext();
  const firstImageDetails = imageDetails[0];
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center relative">
        {firstImageDetails?.seedImageUrl && (
          <div
            className="tablet:w-[400px] tablet:h-[400px] w-[512px] h-[512px] relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Image
              src={firstImageDetails.seedImageUrl}
              alt="Stack Image"
              fill
              priority
              className="relative flex z-[3] rounded-[48px]"
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
        )}
        {hovered && (
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`tablet:w-[400px] tablet:h-[400px] w-[512px] h-[512px] absolute z-[10] rounded-[48px] `}
          >
            <div
              className={`flex relative p-[40px] rounded-tr-[48px] rounded-tl-[48px]  backdrop-blur-[2px] ${styles.backdrop} `}
            >
              <div className={`flex w-[360px]`}>
                <ProfileLogo profileImageUrl={firstImageDetails?.seedImageProfileUrl} />
                <div className="ml-[5px] flex flex-col justify-center items-start gap-[4px]">
                  <div
                    className={`not-italic leading-[100%] text-[#FFFFFF] font-bold text-[14px] ${styles.name}`}
                  >
                    {firstImageDetails?.seedImageDisplayName || "Lewis"}
                  </div>
                  <div
                    className={`not-italic font-normal text-[14px] leading-[100%] text-[#FFFFFF] ${styles.Handle}`}
                  >
                    {"@" + firstImageDetails?.seedImageUserName || "Lewis.xyz"}
                  </div>
                </div>
              </div>
              {/* <div
              className={`not-italic text-[16px] leading-[100%] text-[#FFFFFF] font-medium ${styles.createdAt}`}
            >
              {firstImageDetails?.createdAt || "2:32 pm"}
            </div> */}

              {/* <FollowButton data={firstImageDetails} /> */}
            </div>
            <div className={`flex flex-col justify-center items-center absolute top-[82%] left-[50%] text-center gap-[8px] w-full -translate-x-[50%] rounded-br-[48px] rounded-bl-[48px] ${styles.bottomBackdrop}`}>
              <div
                className={`flex justify-center items-center absolute top-[82%] left-[50%] text-center gap-[8px] tablet:w-[340px] w-[432px] h-[40px] rounded-[4px] backdrop-blur-[60px] cursor-pointer ${styles.bottomBox}`}
                onClick={() => {
                  setPublication(pub);
                  router.push(`/chain/${pub?.chainId}`);
                }}
              >
                <div
                  className={`flex justify-center items-center absolute text-center text-[#000000] not-italic font-medium text-[16px] leading-[100%] gap-[8px] ${styles.bottomBoxText}`}
                >
                  <BlackEyeIcon />
                  <div>View Chain </div>
                </div>
              </div>
              <div className="flex items-center absolute top-[30px] left-[40%] mt-[20px]">
                <ChainIcon />
                <p className="ml-[10px] text-[16px] text-[#ffffff]">
                  {firstImageDetails.totalWhispers} whispers
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="absolute bottom-[-26px] z-[2]">
          <div className="tablet:w-[350px] tablet:h-[400px] w-[452px] h-[512px] relative">
            <Image
              alt="Stack Image 2"
              className="rounded-[48px]"
              fill
              src={
                imageDetails[1]?.imageUrl
                  ? imageDetails[1].imageUrl
                  : "https://whisperchain-staging-static-files.s3.us-east-2.amazonaws.com/stability/image15.png"
              }
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
        </div>
        <div className="absolute bottom-[-44px] z-[1]">
          <div className="tablet:w-[300px] tablet:h-[400px] w-[404px] h-[512px] relative">
            <Image
              alt="Stack Image 3"
              className="rounded-[48px]"
              fill
              src={
                imageDetails[2]?.imageUrl
                  ? imageDetails[2].imageUrl
                  : "https://whisperchain-staging-static-files.s3.us-east-2.amazonaws.com/stability/image16.png"
              }
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
        </div>
      </div>
      {currentSlideIndex === 0 &&
        <div className="swiperGif w-1/2 flex flex-col items-center h-[1px] z-1  opacity-40 relative tablet:top-[45px] top-[10%]"
          id="swiperGif">
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/whisperHomePage/swiperGif.gif`}
            alt="Swiper Gif"
            width={40}
            height={40}
            onMouseEnter={() => setSwipeHovered(true)}
            onMouseLeave={() => setSwipeHovered(false)}
          />
          {swipeHovered &&
            <p className="text-black text-[14px]"
              onmou
            >Scroll to view more </p>
          }
        </div>
      }
    </div>
  );
};

export default ImagesStack;
