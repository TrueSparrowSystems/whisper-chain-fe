import Main from "../src/components/Main";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Main />
      <div className="tostify">
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
