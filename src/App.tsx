import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Home from "./components/home";
import ProductDetail from "./components/product-detail";
import Checkout from "./components/checkout";
import Header from "./components/header/Header";

interface ProductType {
  productId: string;
  productName: string;
  img: string;
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFD814",
          borderRadius: "50px",
          color: "black",
          fontSize: "12px",

          "&:hover": {
            backgroundColor: "#FFD814",
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [giftCards, setGiftCards] = useState<ProductType[] | []>([]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div style={{ padding: "8px" }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Home giftCards={giftCards} setGiftCards={setGiftCards} />
              }
            />
            <Route
              path="/product-detail/:productId"
              element={<ProductDetail />}
            />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
