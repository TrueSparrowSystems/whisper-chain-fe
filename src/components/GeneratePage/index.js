import Generate from "../../Tabs/GenerateImage/Generate";
import { useWindowSize } from "../../utils/Utils";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import JoinedFromMobile from "../JoinedFromMobile";
import styles from "./GeneratePage.module.css";

export default function GeneratePage({ chainId }) {
  let { width } = useWindowSize();
  return (
    <div className={styles.pageWrapper}>
      {width > 1024 || !width ? (
        <>
          <Header />
          <div className={styles.componentWrapper}>
            <Generate chainId={chainId} />
          </div>
          <BottomTabSelector />
        </>
      ) : (
        <>
          <JoinedFromMobile />
        </>
      )}
    </div>
  );
}
