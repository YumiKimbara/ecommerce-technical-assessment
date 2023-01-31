import Cart from "./Cart";
import { useCallback, useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./styles.css";

interface AddedProdType {
  id: string;
  quantity: number;
}

interface ProductType {
  productId: string;
  productName: string;
  img: string;
  description: string;
  available: boolean;
}

const ProductDetail: React.FC = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const { productId } = useParams();

  const [prodNum, setProdNum] = useState<number>(0);
  const [prodsAddedToCart, setProdsAddedToCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [prodAdded, setProdAdded] = useState(false);
  const [selectedProd, setSelectedProd] = useState<any>([]);

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("product") || "[]") || [];
    const selectedProduct = product.filter((prod: ProductType) => {
      return prod.productId.toString() === productId;
    });

    console.log("selectedProd", selectedProduct[0]);

    setSelectedProd(selectedProduct[0]);
  }, [productId]);

  const handleIncrementProd = useCallback(() => {
    setProdNum((prev) => prev + 1);
  }, []);

  const handleDecrementProd = useCallback(() => {
    if (prodNum === 0) return;
    setProdNum((prev) => prev - 1);
  }, [prodNum]);

  const handleAddToCartButton = useCallback(
    (
      productId?: string,
      prodNum?: number,
      setProdNum?: (value: number) => void
    ) => {
      if (prodNum === 0) return;
      const selectedProduct = { id: productId, quantity: prodNum };
      const prodsAddedToCart =
        JSON.parse(localStorage.getItem("cart") || "[]") || [];

      let existingProd = prodsAddedToCart.find(
        (prod: AddedProdType) => prod.id === selectedProduct.id
      );
      if (existingProd) {
        existingProd.quantity = prodNum;
      } else {
        prodsAddedToCart.push(selectedProduct);
      }
      localStorage.setItem("cart", JSON.stringify(prodsAddedToCart));
      setProdNum!(0);
      if (selectedProduct.quantity !== 0) setProdAdded(true);

      setProdsAddedToCart(prodsAddedToCart);
    },
    []
  );

  const handleCloseSnackBar = useCallback(() => {
    setProdAdded(false);
  }, []);

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={prodAdded}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Cart was updated!!
        </Alert>
      </Snackbar>
      <Grid
        container
        direction={isSmall ? "column" : "row"}
        gap={isSmall ? 7 : 0}
      >
        <Grid item xs={12} md={7} className="productDetail">
          <h3>Product Detail</h3>
          <img className="productImage" src={selectedProd.img} alt="product" />
          <p>Product ID: {productId}</p>
          <p>Product name: {selectedProd.productName}</p>
          <p>Description: {selectedProd.description}</p>
          <p>Availablity: {selectedProd.available ? "true" : "false"}</p>
          <div>
            <IconButton aria-label="remove" onClick={handleDecrementProd}>
              <RemoveIcon />
            </IconButton>
            {prodNum}
            <IconButton
              aria-label="add"
              className="incrementButton"
              onClick={handleIncrementProd}
            >
              <AddIcon />
            </IconButton>
          </div>
          <div className="button">
            <Button
              variant="contained"
              disabled={!prodNum}
              onClick={() =>
                handleAddToCartButton(productId, prodNum, setProdNum)
              }
            >
              Add to Cart
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={5} className="cart">
          <Cart
            prodsAddedToCart={prodsAddedToCart}
            setProdsAddedToCart={setProdsAddedToCart}
          />
          <div className="button">
            <Link
              to={{
                pathname: "/",
              }}
            >
              <Button variant="contained">go back to home</Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
