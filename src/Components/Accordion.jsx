import React, { memo } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Accordion = memo(({ title, products, isOpen, onToggle }) => {
  return (
    <div className="mb-6">
   
      <div
        onClick={onToggle}
        className="cursor-pointer flex justify-between items-center py-4 px-6 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {isOpen ? (
          <FaChevronUp className="text-white" />
        ) : (
          <FaChevronDown className="text-white" />
        )}
      </div>

    
      {isOpen && (
        <div className="pt-4 pb-6 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
            
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h4 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                {product.title}
              </h4>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {product.description.length > 100
                  ? product.description.slice(0, 100) + '...'
                  : product.description}
              </p>

              <p className="text-xl font-semibold mt-2 text-gray-800 dark:text-white">
                ${product.price}
              </p>

              <Link
                to={`/product/${product.id}`} 
                className=" text-cyan-300 hover:text-amber-500  mt-4 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Accordion;
