import React from "react";
import { usePublicationContext } from "../../context/PublicationContext";
import {
  getIpfsUrlandUploadPublication,
  getImagesFromPrompt,
  postWhisperResponse,
  getChainWhispers,
} from "../../utils/Utils";
import { FILTER_OPTIONS } from "./filterDropdownOptions";

import styles from "./generateImage.module.css";
import MagicStickIcon from "../../assets/MagicStickIcon";
import WhisperImage from "../../components/WhisperImage";
import GeneratedImageBox from "../../components/GeneratedImageBox";
import { useRouter } from "next/router";
import EmptyStateLogo from "../../assets/EmptyStateLogo";
import { useAccount } from "wagmi";
import ChevronIcon from "../../assets/ChevronIcon";
import moment from "moment";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../../components/Main/TabItems";

function Generate({ chainId }) {
  const { address } = useAccount();

  const { publication } = usePublicationContext();
  const router = useRouter();
  const [promptText, setPromptText] = React.useState("");
  const [promtEmpty, setPromtEmpty] = React.useState(false);
  const [specialCharacter, setSpecialCharacter] = React.useState();
  const [textAreaEntered, setTextAreaEntered] = React.useState();
  const [urls, setUrls] = React.useState([]);
  const limit = 5 - urls.length;
  const [pubsId, setPubsId] = React.useState();
  const [isLoading, setIsloading] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState(
    FILTER_OPTIONS[0].value
  );
  const [emptyState, setEmptyState] = React.useState(true);
  const [disableGeneration, setDisableGeneration] = React.useState(false);
  const { onTabChange } = useBottomTab();
  const [generatingImage, setGeneratingInage] = React.useState(false);
  const paginationParams = React.useRef({
    page: 1,
    limit: 1,
  });

  var regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;

  const [previousImageUrl, setPreviousImageUrl] = React.useState();

  React.useEffect(() => {
    if (publication?.pubId) {
      setPubsId(publication?.pubId);
      setPreviousImageUrl(publication?.comments?.[0]?.imageUrl);
      const profileIdForGeneratedPost = publication?.comments?.[0]?.profileId;
      const loggedInUserProfileId = localStorage.getItem("profileId");
      if (profileIdForGeneratedPost === loggedInUserProfileId) {
        setDisableGeneration(true);
      }
    } else {
      fetchdata();
    }
  }, [chainId]);

  const fetchdata = async () => {
    // console.log("generatepage chainid", chainId);
    const whisperRes = await getChainWhispers(
      chainId,
      paginationParams.current
    );
    // console.log("-------------", whisperRes);
    const whisperIds = whisperRes?.whisper_ids;
    const whisper = whisperRes?.whispers[whisperIds[0]];
    const imageUrl = whisperRes?.images[whisper?.image_id]?.url;
    const pubId = whisperRes?.chains[whisper?.chain_id]?.platform_chain_id;
    // console.log(whisper);
    setPreviousImageUrl(imageUrl);
    setPubsId(pubId);
    const profileIdForGeneratedPost =
      whisperRes?.users[whisper?.user_id]?.platform_user_id;
    const loggedInUserProfileId = localStorage.getItem("profileId");
    if (profileIdForGeneratedPost === loggedInUserProfileId) {
      setDisableGeneration(true);
    }
  };

  const onImageClickHandler = async (url) => {
    setIsloading(true);
    const { txHash, whisperIpfsObjectId, imageIpfsObjectId } =
      await getIpfsUrlandUploadPublication(url, pubsId, address);
    // console.log({ txHash });
    await postWhisperResponse(
      url,
      txHash,
      whisperIpfsObjectId,
      imageIpfsObjectId,
      chainId || publication?.chainId
    );
    setIsloading(false);
    onTabChange(TabItems[0]);
    router.push(
      `/chain/${chainId || publication?.chainId}?isGenerated=true`,
      `/chain/${chainId || publication?.chainId}`
    );
  };

  const generateImageClickHandler = async () => {
    if (regex.test(promptText)) {
      setSpecialCharacter(true);
    } else {
      if (urls.length < 5) {
        setGeneratingInage(true);
        setUrls([1, ...urls]);
        setEmptyState(false);
        setIsloading(true);
        const response = await getImagesFromPrompt(promptText, selectedFilter);
        if (response) {
          setGeneratingInage(false);
        }
        const suggestionIds = response.suggestions_ids;
        const suggestions = response.suggestions;
        const images = [];
        {
          suggestionIds.map((id) => {
            const suggestion = suggestions[id];
            images.push(suggestion?.image_url);
          });
        }
        const newUrls = [images, ...urls];

        setUrls(newUrls);
        setIsloading(false);
      }
    }
  };

  const generateImageContainerRef = React.useRef(null);
  const [btnPosition, setBtnPosition] = React.useState("absolute");

  const onScroll = () => {
    console.log(generateImageContainerRef.current?.scrollTop);
    if (generateImageContainerRef.current?.scrollTop > 0) {
      setBtnPosition("absolute");
    } else {
      setBtnPosition("static");
    }
  };

  React.useEffect(() => {
    const { innerHeight: height } = window;

    if (height <= 900) {
      setBtnPosition("static");
    }
  }, []);

  return (
    <div
      className={styles.mainContainer}
      onScroll={onScroll}
      ref={generateImageContainerRef}
    >
      <div className="flex gap-[16px] justify-center items-center">
        {/* Sidebar */}
        <div className={styles.sidebarContainer}>
          {/* Previos Whisper Image */}
          <div className="w-full">
            <div className="flex flex-col mb-[8px]">
              <div className={styles.mainText}>
                Last whisper of{" "}
                {publication?.createdAt
                  ? moment.unix(publication?.createdAt).format("MMMM Do")
                  : null}{" "}
                chain
              </div>
              <div className={styles.subText}>
                Try to describe this whisper as best you can.
              </div>
            </div>
            <div className="relative">
              <div
                className={`w-[256px] h-[256px] relative flex justify-center items-center ${disableGeneration ? "opacity-25" : ""
                  }`}
              >
                <WhisperImage
                  imgSrcUrl={previousImageUrl}
                  width={256}
                  height={256}
                  priority={true}
                  alt="Whisper Image"
                  classes="rounded-[8px]"
                />
              </div>
              {/* Disabled state when User cannot post(if last post by same user) */}
              {disableGeneration && (
                <div
                  className={`flex justify-center items-center w-[200px] h-[82px] relative bg-[#FFFFFF] rounded-[8px] text-center ${styles.errorStateBox}`}
                >
                  <span className="not-italic text-[14px] font-medium m-[8px]">
                    Previous whisper was added by you. Please come back later to
                    add a whisper again
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className={`${disableGeneration ? "opacity-25" : ""}`}>
              <div className={`mb-[8px] ${styles.mainText}`}>Enter prompt</div>
              <textarea
                onMouseEnter={() => setTextAreaEntered(true)}
                onMouseLeave={() => setTextAreaEntered(false)}
                className={`${styles.promptInput} text-sm shadow-sm 
                  placeholder-[#1d0545b8]
                  focus:outline-none focus:border-[#6f1aff3d] focus:ring-1 
                  ${promtEmpty ? "focus:ring-[red]" : "focus:ring-[#6f1aff3d]"}
                  ${disableGeneration
                    ? "cursor-not-allowed	pointer-events-none"
                    : ""
                  }
                  ${textAreaEntered
                    ? "placeholder:text-[#1d0545b8]"
                    : "placeholder:text-[#1d05458f]"
                  }
                `}
                placeholder="Enter your prompt here to generate your very own whisper"
                value={promptText}
                onChange={(e) => {
                  setPromptText(e.target.value);
                  setSpecialCharacter(false);
                  if (!e.target.value.replace(/\s/g, "").length) {
                    setPromtEmpty(true);
                  } else {
                    setPromtEmpty(false);
                  }
                }}
              ></textarea>
              {specialCharacter && (
                <span className="text-[#cf3838] text-[12px]">
                  Prompt can not contain special characters
                </span>
              )}
            </div>
            <div
              className={`w-full mt-[8px]  ${disableGeneration ? "opacity-25" : ""
                }`}
            >
              <div className={styles.mainText}>Filter</div>
              <div className={`${styles.subText} mb-[8px]`}>
                Select a style to create more refined whispers
              </div>
              <div>
                <select
                  className={`${styles.selectBoxInput} ${disableGeneration
                      ? "cursor-not-allowed	pointer-events-none"
                      : ""
                    }`}
                  value={selectedFilter}
                  onChange={(e) => {
                    setSelectedFilter(e.target.value);
                  }}
                >
                  {FILTER_OPTIONS.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div class="dropdown inline-block relative">
                  <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                    <span class="mr-1">Dropdown</span>
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                  </button>
                  <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                    <li class=""><a class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">One</a></li>
                    <li class=""><a class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Two</a></li>
                    <li class=""><a class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Three is the magic number</a></li>
                  </ul>
                </div>

                <div className="relative flex justify-end bottom-[25px] right-[10px] pointer-events-none">
                  <ChevronIcon />
                </div>
              </div>
            </div>
          </div>
          {/* Generate Image Button */}
          <div
            className={`w-full bottom-[16px] ${promptText === "" || promtEmpty || limit == 0
                ? "opacity-50 cursor-not-allowed	pointer-events-none"
                : ""
              } ${btnPosition}
              ${disableGeneration
                ? "opacity-25 cursor-not-allowed pointer-events-none"
                : ""
              }
               ${generatingImage ? "cursor-not-allowed pointer-events-none" : ""
              }`}
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={generateImageClickHandler}
            >
              <button className={styles.generateButton}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[5px]">
                    <span className={styles.generateButtonText}>
                      {generatingImage
                        ? "Images being generated"
                        : "Generate whisper"}
                    </span>
                    {!generatingImage && (
                      <>
                        <span className={styles.tryCounts}>&#x2022;</span>
                        <span className={styles.tryCounts}>
                          {limit} tries left
                        </span>
                      </>
                    )}
                  </div>
                  <div>
                    <MagicStickIcon />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* Image Gallery */}
        <div className={styles.imageGalleryContainer}>
          <div className={styles.galleryMainText}>Your generations</div>
          {urls.map((url, index) => (
            <div className={styles.imageTryOutputBox} key={index}>
              <div className="flex items-center justify-center w-full gap-[12px]">
                <GeneratedImageBox
                  imgSrcUrl={url[0]}
                  key={index}
                  clickHandler={() => onImageClickHandler(url[0])}
                  setDisableGeneration={setDisableGeneration}
                  chainId={chainId}
                />
                <GeneratedImageBox
                  imgSrcUrl={url[1]}
                  key={index}
                  clickHandler={() => onImageClickHandler(url[1])}
                  setDisableGeneration={setDisableGeneration}
                  chainId={chainId}
                />
              </div>
            </div>
          ))}
          {emptyState && (
            <div className="overflow-hidden w-full">
              {[...Array(2)].map((index) => (
                <div className={styles.imageTryOutputBox} key={index}>
                  <div className="flex items-start justify-start gap-[12px] w-full">
                    {[...Array(2)].map((index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-center w-[402px] h-[402px] relative group ${styles.defaultState}`}
                      >
                        <EmptyStateLogo />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Generate;
