import Home from "../../Tabs/Home";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import JoinedFromMobile from "../JoinedFromMobile";
import styles from "./Main.module.css";

export default function Main() {

  return (
    <div className={styles.pageWrapper} id="home-section">
      <div className={styles.pageWrap}>
      <Header />
      <div className={styles.componentWrapper}>
        <Home />
      </div>
      <BottomTabSelector />
      </div>
      <div className={styles.mobileView}>
        <JoinedFromMobile />
      </div>
    </div>
  );
}
