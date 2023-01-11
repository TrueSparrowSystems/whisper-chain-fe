import { useRouter } from "next/router";
import React from "react";
import ChainPage from "../../src/components/ChainPage";
import { Toaster } from "react-hot-toast";

const chain = () => {
  const router = useRouter();
  const chainId = router?.query?.chainId;
  return (
    <div>
      <ChainPage chainId={chainId} />
      <div className="tostify">
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default chain;
