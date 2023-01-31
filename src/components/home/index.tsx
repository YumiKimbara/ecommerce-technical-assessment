import { useEffect } from "react";
import Product from "./Product";
import Grid from "@mui/material/Grid";

import "./styles.css";

interface ProductType {
  productId: string;
  productName: string;
  img: string;
}

interface GiftCardsType {
  giftCards: ProductType[];
  setGiftCards: (value: ProductType[]) => void;
}

const Home: React.FC<GiftCardsType> = ({ giftCards, setGiftCards }) => {
  useEffect(() => {
    const getGiftCardsRLDData = async () => {
      try {
        const response = await fetch(
          "https://api.chimoney.io/v0.2/info/assets"
        );
        const data = await response.json();
        setGiftCards(data.data.giftCardsRLD.content);
        localStorage.setItem(
          "product",
          JSON.stringify(data.data.giftCardsRLD.content)
        );
      } catch (err) {
        console.error(err);
      }
    };
    getGiftCardsRLDData();
  }, [setGiftCards]);

  return (
    <div>
      <h3>Home</h3>
      <Grid container className="homeWrapper">
        {giftCards.map((prod: ProductType) => {
          return (
            <Grid key={prod.productId} item xs={12} md={4}>
              <Product
                productId={prod.productId}
                productName={prod.productName}
                img={prod.img}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Home;
