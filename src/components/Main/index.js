import Home from "../../Tabs/Home";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import JoinedFromMobile from "../JoinedFromMobile";
import styles from "./Main.module.css";

export default function Main() {

  return (
    <div className={styles.pageWrapper} id="home-section">
      <Header />
      <div className={styles.componentWrapper}>
        <div className={styles.pageWrap}>
          <Home />
        </div>
        <div className={styles.mobileView}>
          <JoinedFromMobile />
        </div>
      </div>
      <BottomTabSelector />
    </div>
  );
}
