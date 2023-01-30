import Home from "../../Tabs/Home";
import { useWindowSize } from "../../utils/Utils";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import JoinedFromMobile from "../JoinedFromMobile";
import styles from "./Main.module.css";

export default function Main() {
  let { width } = useWindowSize();
  return (
    <div className={styles.pageWrapper} id="home-section">
      {width > 1024 ? (
        <>
          <Header />
          <div className={styles.componentWrapper}>
            <Home />
          </div>
          <BottomTabSelector />
        </>
      ) : (
        <JoinedFromMobile />
      )}
    </div>
  );
}
