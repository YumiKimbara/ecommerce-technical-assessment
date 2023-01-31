import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import "./styles.css";

interface ProductType {
  productId: string;
  productName: string;
  img: string;
}

const Product: React.FC<ProductType> = ({ productId, productName, img }) => {
  return (
    <div className="product">
      <img className="homeProductImage" src={img} alt="product" />
      <p className="productName">{productName}</p>
      <Link
        to={{
          pathname: `/product-detail/${productId}`,
        }}
      >
        <Button variant="contained">See the detail</Button>
      </Link>
    </div>
  );
};

export default Product;
