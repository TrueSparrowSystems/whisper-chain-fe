import React from "react";
import styled from "styled-components";
import ProfileLogo from "../assets/ProfileLogo";
import { useBottomTab } from "../context/BottomTabContext";
import { usePublicationContext } from "../context/PublicationContext";
import { TabItems } from "./Main/TabItems";
import Image from 'next/image';

const StackedImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 572px;
`;

const Backdrop = styled.div`
  width: 512px;
  height: 512px;
  position: absolute;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.66) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 10;
  backdrop-filter: blur(4px);
  border-radius: 48px;
  cursor: pointer;
`;

const Details = styled.div`
  display: flex;
  position: relative;
  padding: 40px;
`;

const Left = styled.div`
  display: flex;
  width: 360px;
  cursor: pointer;
`;

const Name = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  letter-spacing: -0.01em;
  font-feature-settings: "tnum" on, "onum" on, "salt" on, "ss01" on, "ss02" on,
    "ss03" on, "ss04" on, "ss05" on;

  color: #ffffff;
`;

const Handle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  letter-spacing: -0.03em;
  font-feature-settings: "tnum" on, "onum" on, "ordn" on, "salt" on, "ss01" on,
    "ss02" on, "ss03" on, "ss04" on, "ss05" on;

  color: #ffffff;
`;

const Right = styled.div`
  display: flex;
  color: #ffffff;
`;

const User = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 100%;
  /* identical to box height, or 20px */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  letter-spacing: -0.03em;

  color: #ffffff;

  text-shadow: 0px 4px 20px rgba(13, 3, 29, 0.95);
`;

const ImagesStack = ({ imageDetails, pub }) => {
  const [hovered, setHovered] = React.useState(false);
  const { onTabChange } = useBottomTab();
  const { setPublication } = usePublicationContext();
  console.log("Src", imageDetails);
  return (
    <StackedImages>
      {imageDetails?.imageUrl && (
        <Image
         src={imageDetails.imageUrl}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         alt="Stack Image"
         width={512}
         height={512}
         className="relative flex z-[3] rounded-[48px]"
        />
      )}
      {hovered && (
        <Backdrop
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            setPublication(pub);
            onTabChange(TabItems[2]);
          }}
        >
          <Details>
            <Left>
              <ProfileLogo profileImageUrl={imageDetails?.profileImageUrl} />
              <User>
                <Name>{imageDetails?.name || "Lewis"}</Name>
                <Handle>{imageDetails?.profileHandle || "Lewis.xyz"}</Handle>
              </User>
            </Left>
            <Right>{imageDetails?.createdAt || "2:32 pm"}</Right>
          </Details>
          <Center>Click to view the chain</Center>
        </Backdrop>
      )}
      <Image
        width={452}
        height={512}
        className="absolute bottom-[22px] rounded-[48px] flex z-[2]"
        alt="Stack Image 2"
        src="https://i.picsum.photos/id/193/512/512.jpg?hmac=ay70CF2_XM0GJBcUQzMN6UNHDn0-kgSIu8KcENreNgM" 
      />
      <Image
        width={404}
        height={512}
        className="absolute bottom-[0px] rounded-[48px] flex z-[1]"
        alt="Stack Image 3"
        src="https://i.picsum.photos/id/524/512/512.jpg?hmac=2VlA0x6Y7osphrvDzR52TVkYjcc493rqcizd8HEXphY" 
      />
    </StackedImages>
  );
};

export default ImagesStack;
