import React from "react";
import { Constants } from "./Constants";
import {
  broadcastRequest,
  commentViaDispatcher,
  refreshAuthentication,
} from "./lensFunction";
import axios from "axios";

// axios default settings
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const resetLocalStorage = () => {
  window.localStorage.removeItem(Constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(Constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY);
  window.localStorage.removeItem("profileId");
  window.localStorage.removeItem("profile");
};

export const getImagesFromPrompt = async (prompt, filter = "") => {
  const resp = await axios.get(
    `/images?prompt=${prompt}&art_style=${filter}`,
    {}
  );
  const responseData = resp?.data;
  return responseData.data;
};

export const loginApi = async (signParams) => {
  const resp = await axios.post(`/lens/connect`, signParams, {
    withCredentials: true,
  });
};

export const logoutApi = async () => {
  const resp = await axios.post(
    `/lens/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const getIpfsUrl = async (url) => {
  const resp = await fetch(
    `https://whisperchain.xyz/api/whisper?s3_url=${url}`,
    {
      method: "GET",
    },
    {
      withCredentials: true,
    }
  );
  const responseJSON = await resp.json();
  const contentId = responseJSON.data.cids.metadata;
  const ipfsUrl = `ipfs://${contentId}`;
  return ipfsUrl;
};

export const createIpfsObjects = async (url, chainId) => {
  console.log("Base domain: ", process.env.BASE_URL);
  // Todo @shahhardik4599 and @GopalJasani09 Remove hardcoding from url
  const resp = await axios.post(
    "/lens/ipfs-objects",
    {
      s3_url: url,
      title: "",
      description: `Hello frens! I have generated this mutation with the help of AI. \n Generate your own and add to chain on  https://whisperchain.xyz/chain/${chainId}`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  const responseData = resp?.data;
  return responseData.data;
};

export const postWhisperResponse = async (
  url,
  txHash,
  whisperIpfsObjectId,
  imageIpfsObjectId,
  chainId
) => {
  await axios.post(
    `/lens/whispers`,
    {
      s3_url: url,
      transaction_hash: txHash,
      whisper_ipfs_object_id: whisperIpfsObjectId,
      image_ipfs_object_id: imageIpfsObjectId,
      chain_id: chainId,
    },
    {
      withCredentials: true,
    }
  );
};

export function convertIntoIpfsUrl(url) {
  // console.log("image url", url);
  if (url.toString().startsWith("ipfs://")) {
    const cid = url.split("ipfs://")[1];
    // console.log("cid", cid);
    return `https://${cid}.ipfs.w3s.link`;
  } else if (!url.toString().startsWith("https://")) {
    return `https://${url}`;
  } else {
    return url;
  }
}

export const broadcastData = async (id, data) => {
  return await broadcastRequest({ id, signature: data });
};

export const getTimerClock = (timeDifference) => {
  const timeRemaining = 24 * 60 - timeDifference;
  const hours = Math.floor(timeRemaining / 60);
  const minutes = timeRemaining % 60;
  return `${hours}h : ${minutes}m `;
};

export const timer = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = React.useState(
    countDownDate - new Date().getTime()
  );
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);
  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));

  return [hours, minutes];
};

export const getProfileImage = () => {
  const profile = JSON.parse(window.localStorage.getItem("profile"));
  return profile?.picture
    ? convertIntoIpfsUrl(profile.picture?.original?.url)
    : `https://cdn.stamp.fyi/avatar/eth:${profile.ownedBy}?s=250`;
};

export const getChains = async ({ page = 1, limit = 10 }) => {
  const resp = await axios.get(`/lens/chains?page=${page}&limit=${limit}`);
  const responseData = resp?.data;
  return responseData.data;
};

export const getChainWhispers = async (chainId, { page = 1, limit = 10 }) => {
  const resp = await axios.get(`/lens/${chainId}?page=${page}&limit=${limit}`);
  const responseData = resp?.data;
  return responseData.data;
};

export const getLatestWhisper = async (chainId) => {
  const resp = await axios.get(`/lens/${chainId}?page=1&limit=1`);
  const responseData = resp?.data;
  return responseData.data;
};

export async function getIpfsUrlandUploadPublication(
  url,
  chainId,
  pubId,
  address
) {
  let whisperIpfsObjectId;
  let imageIpfsObjectId;
  const metadataResponse = await createIpfsObjects(url, chainId);
  const ipfsObjectIds = metadataResponse?.ipfs_object_ids;
  const ipfsObjects = metadataResponse?.ipfs_objects;
  let ipfsUrl = "";
  {
    ipfsObjectIds.map((id) => {
      const ipfsObject = ipfsObjects[id];
      if (ipfsObject.entity_kind === "WHISPER") {
        ipfsUrl = `ipfs://${ipfsObject.cid}`;
        whisperIpfsObjectId = id;
      } else if (ipfsObject.entity_kind === "IMAGE") {
        imageIpfsObjectId = id;
      }
    });
  }
  await refreshAuthentication();

  const res = await commentViaDispatcher(
    window.localStorage.getItem("profileId"),
    pubId,
    ipfsUrl,
    address
  );
  return {
    txHash: res?.data?.createCommentViaDispatcher?.txHash,
    whisperIpfsObjectId,
    imageIpfsObjectId,
  };
}

export const useWindowSize = () => {
  const [size, setSize] = React.useState([0, 0]);

  React.useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return {
    width: size[0],
    height: size[1],
  };
};
