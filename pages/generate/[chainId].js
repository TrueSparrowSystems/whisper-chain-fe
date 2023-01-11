import { useRouter } from "next/router";
import React from "react";
import GeneratePage from "../../src/components/GeneratePage";
import { Toaster } from "react-hot-toast";

const generate = () => {
  const router = useRouter();
  const chainId = router?.query?.chainId;
  // console.log("chainId", chainId);
  return (
    <div>
      <GeneratePage chainId={chainId} />
      <div className="tostify">
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default generate;
