import Home from "../../Tabs/Home";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import JoinedFromMobile from "../JoinedFromMobile";
import styles from "./Main.module.css";
import { useWindowSize } from "../../utils/Utils";

export default function Main() {
  let { width } = useWindowSize();

  return (
    <div className={styles.pageWrapper}  id="home-section">
      {width > 1024 || !width ? (
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
