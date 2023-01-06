import { AppThunk } from "@common/store";
import { ProductI } from "@module/products";
import { ProductCartI } from "@module/cart";
import { addProductToCart, deleteProduct, updateProductCount } from "./slice";

export const addToCart =
  ({ product, quantity }: { product: ProductI; quantity?: number }): AppThunk =>
  async (dispatch, getState) => {
    const products = getState().cart.products?.filter(
      (filteredProduct) => filteredProduct.id === product.id
    );

    const isProductAlreadyInCart = products && products?.length >= 1;

    const formatedProduct: ProductCartI = {
      id: product.id,
      image: product.image,
      price: product.price,
      count: quantity ? quantity : 1,
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
          product: {
            ...formatedProduct,
            count: quantity
              ? products[0].count + quantity
              : products[0].count + 1,
          },
          quantity,
        })
      );
    }
  };

export const deleteFromCart =
  ({ product }: { product: ProductCartI }): AppThunk =>
  async (dispatch, getState) => {
    const products = getState().cart.products?.filter(
      (filteredProduct) => filteredProduct.id === product.id
    );

    if (!products) throw new Error();

    await dispatch(
      deleteProduct({
        product: { ...product, count: products[0].count },
      })
    );
  };
