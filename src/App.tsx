import "./App.css";
import { ConfigProvider } from "antd";
import { theme } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          fontFamily: "ITC Avant Garde Gothic",
          colorPrimary: "#BC1E22",
        },
        components: {
          Layout: {
            bodyBg: "transparent",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
