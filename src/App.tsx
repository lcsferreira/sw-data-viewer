import "./App.css";
import { ConfigProvider } from "antd";
import { theme } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
