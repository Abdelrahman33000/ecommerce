import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import Accordion from '../../Components/Accordion';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      try {
        const productPromises = categories.map((category) =>
          axios.get(`https://fakestoreapi.com/products/category/${category}`)
        );
        const productsResponses = await Promise.all(productPromises);
        const newProducts = productsResponses.reduce((acc, response, index) => {
          acc[categories[index]] = response.data;
          return acc;
        }, {});
        setProductsByCategory(newProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    if (categories.length > 0) {
      fetchProductsByCategory();
    }
  }, [categories]);

  const handleAccordionToggle = useCallback((index) => {
    setOpenIndex(openIndex === index ? null : index);
  }, [openIndex]);

  const memoizedProducts = useMemo(() => {
    return Object.keys(productsByCategory).map((category) => {
      return {
        category,
        products: productsByCategory[category],
      };
    });
  }, [productsByCategory]);

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Product Categories</h1>
      {loading ? (
        <div className="text-center text-xl text-gray-600">Loading...</div>
      ) : (
        memoizedProducts.map(({ category, products }, index) => (
          <Accordion
            key={index}
            title={category}
            products={products}
            isOpen={openIndex === index}
            onToggle={() => handleAccordionToggle(index)}
          />
        ))
      )}
    </div>
  );
};

export default Home;
