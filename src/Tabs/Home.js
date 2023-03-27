import React from "react";
import HomeMessage from "../components/HomeMessage";
import ImagesStack from "../components/ImagesStack";
import Link from "../assets/Link";
import { getChainData } from "../utils/ViewData";
import SpinningLoader from "../components/SpinningLoader";
import moment from "moment";
import { getTimerClock } from "../utils/Utils";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/effect-creative";

// import required modules
import styles from "./Home.module.css";

// import Swiper core and required modules
import SwiperCore, { Manipulation } from "swiper";
import { usePublicationContext } from "../context/PublicationContext";
import SeedImage from "../assets/SeedImage";

// install Swiper modules
SwiperCore.use([Manipulation]);

const PAGE_LIMIT = 10;

const Home = () => {
  const [publicationData, setPublicationData] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  console.log("currentSlideIndex",currentSlideIndex)
  const { setPublication } = usePublicationContext();
  const paginationParams = React.useRef({
    page: 1,
    limit: PAGE_LIMIT,
  });
  const isFirstLoad = React.useRef(true);
  const [hasMore, setHasMore] = React.useState(false);

  const whisperRef = React.useRef();

  const fetchData = async (paginationParams) => {
    const data = await getChainData(paginationParams);
    const hasMoreFlag = data?.length >= PAGE_LIMIT;
    setHasMore(hasMoreFlag);
    if (publicationData.length == 0) {
      setPublication(data[0]);
    }
    setPublicationData([...publicationData, ...data]);
    setIsloading(false);
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (isFirstLoad) {
        fetchData(paginationParams.current)
      } else {
        fetchNextData(paginationParams.current)
        setIsloading(false);
      }
    }
  }, []);

  const fetchNextData = async () => {
    if (hasMore) {
      paginationParams.current = {
        page: paginationParams.current.page + 1,
        limit: PAGE_LIMIT,
      };
      await fetchData(paginationParams.current);
    }
  };

  const [publicationDate, setPublicationDate] = React.useState();



  return isLoading ? (
    <SpinningLoader height="80vh" width="100%" />
  ) : (
    <div className={`w-full ${styles.homeWrapper}`}>

      <div className="flex h-[780px] relative w-fit gap-[40px] m-auto tablet:h-[650px] tablet:gap-0">
        <div className="flex w-full	flex-col items-center justify-center">
          <div className="w-[512px] h-fit mt-[calc(100vh-512px)] tablet:mt-[calc(100vh-404px)]">
            <div className="absolute top-[10%] left-[0%]">
              <div
                className={`h-[22px] text-[16px] not-italic font-medium leading-[140%] ${styles.Date}`}
              >
                {publicationDate}
              </div>
            </div>

            <div className={`relative ${ hasMore === false ? "bottom-[85px]" : "bottom-[85px]" }`}>
              <InfiniteScroll
                dataLength={publicationData?.length}
                next={fetchNextData}
                hasMore={hasMore}
                height={"calc(100vh - 190px)"}
                endMessage={<div></div>}
                className="scroll-smooth"
              >
                <div
                  id="demmoId"
                  className={styles.chainContainer}
                >
                  {publicationData &&
                    publicationData.map((pub, index) => (
                      <div key={pub?.pubId + index}>
                        <div className={`mb-[125px] tablet:mb-[180px] ${styles.whisperImageCont}`}>
                          <div className="slide w-full flex justify-start relative">
                            {pub?.comments[0] ? (
                              <ImagesStack imageDetails={pub?.comments}
                               evdate = {moment
                                .unix(publicationData[index]?.createdAt)
                                .format("MMMM DD YYYY")}
                               callback={ ( date ) => {setPublicationDate(date)}} pub={pub} index={index} currentSlideIndex={currentSlideIndex} />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className={`text-[16px] flex flex-col items-center relative top-[-100px] tablet:top-[-160px]  ${styles.lastMesssage}`} id="lastEle">
                    <SeedImage />
                    <p className="text-black opacity-[0.6]">You're all caught up</p>
                    <p className="text-center font-medium text-[14px] text-black opacity-[0.4]">You've seen all the chains till date.</p>
                  </div>
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center	right-[0px] z-[2]">
          <div className="absolute left-[calc(50%-296px)] top-[12%] tablet:top-[13%]">
            <Link />
          </div>
          <HomeMessage publication={publicationData[currentSlideIndex]} />
        </div>
      </div>
    </div >
  );
};

export default Home;
