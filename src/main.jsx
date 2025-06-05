import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import App from "./App.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import { SocketProvider } from "./context/SocketContext.jsx"
import GlobalStyles from "./styles/GlobalStyles.js"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <SocketProvider>
            <GlobalStyles />
            <ScrollToTop />
            <App />
            <Toaster position="top-right" />
          </SocketProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
