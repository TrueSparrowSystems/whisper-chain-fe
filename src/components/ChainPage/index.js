import Chain from "../../Tabs/Chain";
import { useWindowSize } from "../../utils/Utils";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import JoinedFromMobile from "../JoinedFromMobile";
import styles from "./ChainPage.module.css";

export default function ChainPage({ chainId }) {
  let { width } = useWindowSize();

  return (
    <div className={styles.pageWrapper}>
      {width > 1024 || !width ? (
        <>
          <Header />
          <div className={styles.componentWrapper}>
            <Chain />
          </div>
          <BottomTabSelector />
        </>
      ) : (
        <JoinedFromMobile />
      )}
    </div>
  );
}
