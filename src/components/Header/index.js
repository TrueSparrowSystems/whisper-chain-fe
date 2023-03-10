import React from "react";
import Logo from "../../assets/Logo";
import HeaderSignin from "./HeaderSignin";
import SignInModal from "../SignInModal";
import { resetLocalStorage } from "../../utils/Utils";
import styles from "./Header.module.css";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    resetLocalStorage();
  };
  const customStyles = {
    content: {
      background: "#FFFFFF",
      height: "fit-content",
      width: 314,
      margin: "auto",
      backdropFilter: "blur(60px)",
      borderRadius: "16px",
      padding: "0px",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.6)",
    },
  };

  return (
    <div
      className= {`px-[32px] flex-row flex justify-between items-center w-full z-[10000] relative pt-[40px] ${styles.headerWrapper} `}
        id="Header"
    >
      <Logo />
      <div className="flex ml-auto gap-[16px]">
        {/* <button className={` w-[92px] h-[36px] bg-[#FFFFFF] rounded-[40px] ${styles.DropdownBtn}`}>
            Twitter
        </button> */}
        <HeaderSignin handleOpen={handleOpen} />
      </div>

      <SignInModal
        onRequestClose={handleClose}
        isOpen={open}
        onSignInComplete={handleClose}
      />
    </div>
  );
};

export default Header;
