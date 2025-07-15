


import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/HomePage.css";
import { AiOutlineReload } from "react-icons/ai";
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page == 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading();
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      // setProducts(data?.products);
      if (data?.products?.length > 0) {
      setProducts(data.products);
    } else {
      setProducts([]); // ⛔️ No products matched — clear view
    }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Best Offers"}>
      {/* <img
        src="/images/b1.jpeg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      /> */}
      <div className="home-wrapper">

        <div className="filters-section">
          <h4 className="text-center">Categories </h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="products-section" >
          <h1 className="text-center">All products</h1>
          <div className="d-flex flex-wrap">
            {
            products?.length === 0 ? (
    <h4 className="text-muted mt-5">No products found.</h4>
  ) : (
            products?.map((p) => (
              <div className="card m-4" key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency:"USD",
                      })}
                    </h5>
                  </div>
                  {/* <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p> */}
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      // onClick={() => {
                      //   setCart([...cart, p]);
                      //   localStorage.setItem(
                      //     "cart",
                      //     JSON.stringify([...cart, p])
                      //   );
                      //   toast.success("Item Added to cart");
                      // }}
                      onClick={() => {
                          const existingItemIndex = cart.findIndex((item) => item._id === p._id);

                           let updatedCart;

                          if (existingItemIndex !== -1) {
                         // If item exists, update quantity
                          updatedCart = [...cart];
                           updatedCart[existingItemIndex].quantity =
                           (updatedCart[existingItemIndex].quantity || 1) + 1;
                           } else {
                     // If item is new, add it with quantity 1
                          updatedCart = [...cart, { ...p, quantity: 1 }];
                             }

                           setCart(updatedCart);
                             localStorage.setItem("cart", JSON.stringify(updatedCart));
                             toast.success("Item added to cart");
                            }}

                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
           ) ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

