import "./App.css";
import { ConfigProvider } from "antd";
import { theme } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "./context/ThemeContext";

function App() {
  const queryClient = new QueryClient();
  const { mode } = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          fontFamily: "ITC Avant Garde Gothic",
          colorPrimary: mode === "dark" ? "#BC1E22" : "#1a387d",
        },
        components: {
          Layout: {
            bodyBg: mode === "dark" ? "#1a1a1a" : "#bfbfbd",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
