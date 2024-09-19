import AppRoutes from "./Routes/route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContextProvider } from "./theme-styles/themeContext";

function App() {
  return (
    <>
      <ThemeContextProvider>
        <ToastContainer />
        <AppRoutes />
      </ThemeContextProvider>
    </>
  );
}

export default App;
