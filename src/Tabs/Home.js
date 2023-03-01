import React from "react";
import HomeMessage from "../components/HomeMessage";
import ImagesStack from "../components/ImagesStack";
import Link from "../assets/Link";
import { getChainData } from "../utils/ViewData";
import SpinningLoader from "../components/SpinningLoader";
import moment from "moment";
import { getTimerClock } from "../utils/Utils";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/effect-creative";

// import required modules
import { Mousewheel, EffectCreative } from "swiper";
import styles from "./Home.module.css";

// import Swiper core and required modules
import SwiperCore, { Manipulation } from "swiper";
import { usePublicationContext } from "../context/PublicationContext";

// install Swiper modules
SwiperCore.use([Manipulation]);

const PAGE_LIMIT = 10;

const Home = () => {
  const [publicationData, setPublicationData] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const { setPublication } = usePublicationContext();
  const paginationParams = React.useRef({
    page: 1,
    limit: PAGE_LIMIT,
  });
  const isFirstLoad = React.useRef(true);
  const [hasMore, setHasMore] = React.useState(false);

  const fetchData = async (paginationParams) => {
    setIsloading(true);
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
      }
    }
  }, []);

  const fetchNextData = async (paginationParams) => {
    const data = await getChainData(paginationParams);
    const hasMoreFlag = data?.length >= PAGE_LIMIT;
    setHasMore(hasMoreFlag);
    if (publicationData.length == 0) {
      setPublication(data[0]);
    }
    setPublicationData([...publicationData, ...data]);
  };

  const onReachEndHandler = async () => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
    } else {
      if (hasMore) {
        paginationParams.current = {
          page: paginationParams.current.page + 1,
          limit: PAGE_LIMIT,
        };
        await fetchNextData(paginationParams.current);
      }
    }
  };

  // const swiperBegining = () => {

  // }

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
                {publicationData[currentSlideIndex]?.createdAt
                  ? moment
                    .unix(publicationData[currentSlideIndex]?.createdAt)
                    .format("Do MMMM YYYY")
                  : null}
              </div>
            </div>
            <Swiper
              // freeMode
              // followFinger
              direction={"vertical"}
              slidesPerView={1}
              preventClicks={true}
              preventClicksPropagation={true}
              spaceBetween={30}
              mousewheel={{
                eventsTarget: "#home-section",
                releaseOnEdges: true,
                sensitivity: 1,
                thresholdDelta: 60,
                thresholdTime: 600,
              }}
              effect={"creative"}
              creativeEffect={{
                prev: {
                  translate: [0, "-100%", 0],
                },
                next: {
                  translate: [0, "100%", 0],
                },
              }}
              modules={[Mousewheel, EffectCreative]}
              onSlideChange={(swiper) =>
                setCurrentSlideIndex(swiper.activeIndex)
              }
              onReachEnd={onReachEndHandler}
            >
              {publicationData &&
                publicationData.map((pub, index) => (
                  <SwiperSlide key={pub?.pubId + index}>
                    <div className="absolute top-0">
                      <div className="slide w-full flex justify-start relative">
                        {pub?.comments[0] ? (
                          <ImagesStack imageDetails={pub?.comments} pub={pub} index={index} />
                        ) : null}
                      </div>
                    </div>
                    {currentSlideIndex === 0 &&
                      <div className="swiperGif w-1/2 flex flex-col items-center h-[1px] z-1  opacity-40 relative tablet:top-[0] top-[12%]"
                        id="swiperGif">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/whisperHomePage/swiperGif.gif`}
                          alt="Swiper Gif"
                          width={40}
                          height={40}
                          onMouseEnter={() => setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                        />
                        {hovered &&
                          <p className="text-black opacity-40 text-[14px]"
                            onmou
                          >Scroll to view more</p>
                        }
                      </div>
                    }
                  </SwiperSlide>
                ))}

            </Swiper>

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
