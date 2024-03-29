import Image from "next/image";
import React from "react";
// import ImageLoader from "./ImageLoader";
import styles from "../../components/WhisperImage/WhisperImage.module.css";
import LoaderSvgIcon from "../../assets/loaderSvgIcon"


export default function GeneratePageImage({
  imgSrcUrl,
  height,
  width,
  alt,
  priority = false,
  classes,
  onLoadingCompleteHandler,
  setErrorOccured,
}) {
  const [imgLoadingError, setImgLoadingError] = React.useState(false);

  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stopColor="#ead9d966" offset="10%"/>
          <stop stopColor="#ead9d966" offset="50%"/>
          <stop stopColor="#ead9d966" offset="70%"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#ead9d966"/>
      <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
    </svg>
  `;

  // const toBase64 = (str) =>
  //   typeof window === 'undefined'
  //     ? Buffer.from(str).toString('base64')
  //     : window.btoa(str)

  const [isImageLoaded, setIsImageloaded] = React.useState(false);

  const onLoadCompleteHandler = () => {
    setIsImageloaded(true);
  };

  React.useEffect(() => {
    if (isImageLoaded) {
      onLoadingCompleteHandler && onLoadingCompleteHandler();
    }
  }, [isImageLoaded])

  console.log("isImageLoaded",isImageLoaded)

  return (
    <>
      {!imgSrcUrl ? (
        <div
          className={`w-fit rounded-[8px]`}
        >    
          <div className="flex items-center tablet:h-[320px] tablet:w-[320px] h-[404px] w-[404px] justify-center z-10">
            <LoaderSvgIcon className="h-[24px] w-[24px]" />
          </div>
        </div>

      ) : (
        <>
          {imgLoadingError ? (
            <div
              className={`overflow-hidden w-full flex items-center justify-center rounded-[8px] ${styles.Errorstate}`}
            >
              <div
                className={`flex items-center justify-center w-[402px] h-[402px] relative group text-[#FF0000] not-italic font-medium text-[14px] leading-[160%]`}
              >
                An error occurred. Please try again
              </div>
            </div>
          ) : (
            <div>
              {
                !isImageLoaded &&
                <div className={`flex items-center tablet:h-[320px] tablet:w-[320px]  h-[404px] w-[404px] justify-center z-10`}>
                  <LoaderSvgIcon className="h-[24px] w-[24px]" />
                </div>
              }
              <Image
                style={{ opacity: isImageLoaded ? 1 : 0 }}
                src={imgSrcUrl}
                priority={priority}
                className={`${classes} object-contain`}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw"
                onLoadingComplete={onLoadCompleteHandler}
                onError={() => {
                  setImgLoadingError(true);
                  setErrorOccured(true);
                }}
              />
            </div>
            // <img src={imgSrcUrl}
            //   priority={priority}
            //   className={`${classes} object-contain`}
            //   alt={alt}
            //   fill
            //   sizes="(max-width: 768px) 100vw,
            //         (max-width: 1200px) 50vw,
            //         33vw"
            //   onloadingComplete={onLoadingCompleteHandler}
            //   onError={() => {
            //     setImgLoadingError(true);
            //     setErrorOccured(true);
            //   }} />
          )}
        </>
      )}
    </>
  );
}
