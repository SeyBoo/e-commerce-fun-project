import { AppThunk } from "../../../common/store";
import { ProductI } from "../../products/types/products.interface";
import { ProductCartI } from "../types/cart.interface";
import { addProductToCart, updateProductCount } from "./slice";

export const addToCart =
  ({ product }: { product: ProductI }): AppThunk =>
  async (dispatch, getState) => {
    const products = getState().cart.products?.filter(
      (filteredProduct) => filteredProduct.id === product.id
    );

    const isProductAlreadyInCart = products && products?.length >= 1;

    const formatedProduct: ProductCartI = {
      id: product.id,
      image: product.image,
      price: product.price,
      count: 1,
      title: product.title,
    };

    if (!isProductAlreadyInCart) {
      await dispatch(
        addProductToCart({
          product: formatedProduct,
        })
      );
    } else {
      await dispatch(
        updateProductCount({
          product: { ...formatedProduct, count: products[0].count + 1 },
        })
      );
    }
  };
