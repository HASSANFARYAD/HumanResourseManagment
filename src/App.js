import AppRoutes from "./Routes/route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContextProvider } from "./theme-styles/themeContext";
import { SignalRProvider } from "./hooks/signalR";

function App() {
  return (
    <>
      <ThemeContextProvider>
        <SignalRProvider>
          <ToastContainer />
          <AppRoutes />
        </SignalRProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
