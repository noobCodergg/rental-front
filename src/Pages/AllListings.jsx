import React, { useEffect, useState } from "react";
import { getAllProperties } from "../Utils/PostApi";
import Cards from "../Components/Cards/Cards";

function AllListings() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 10000],
    location: "",
  });

  const itemsPerPage = 10;

  const fetchAllListings = async () => {
    try {
      const response = await getAllProperties();
      if (response?.data?.data) {
        const currentDate = new Date().toISOString().split("T")[0];
        const validListings = response.data.data.filter((item) => {
          const listingDate = item.rentalDate;
          return listingDate >= currentDate && item.status === false;
        });

        setListings(validListings);
        setFilteredListings(validListings);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (err) {
      console.error("Error fetching listings:", err);
    }
  };

  useEffect(() => {
    fetchAllListings();
  }, []);

  useEffect(() => {
    let updatedListings = listings;

    if (filters.category) {
      updatedListings = updatedListings.filter(
        (item) => item.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    updatedListings = updatedListings.filter(
      (item) =>
        item.price >= filters.priceRange[0] &&
        item.price <= filters.priceRange[1]
    );

    if (filters.location) {
      updatedListings = updatedListings.filter((item) =>
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredListings(updatedListings);
    setCurrentPage(1);
  }, [filters, listings]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const name = e.target.name;
    setFilters({
      ...filters,
      priceRange:
        name === "minPrice"
          ? [value, filters.priceRange[1]]
          : [filters.priceRange[0], value],
    });
  };

  const paginateListings = (listings) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return listings.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">All Listings</h1>
        <p className="text-gray-600 mt-2">
          Find your perfect property from our diverse range of listings.
        </p>
      </header>

      <div className="flex flex-wrap gap-4 mb-8 bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="category" className="text-gray-700 font-medium mb-1">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 text-gray-700 bg-white"
          >
            <option value="">All Categories</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Studio">Studio</option>
          </select>
        </div>

        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-gray-700 font-medium mb-1">Price Range:</label>
          <div className="flex items-center justify-between">
            <input
              type="range"
              name="minPrice"
              min="0"
              max="10000"
              value={filters.priceRange[0]}
              onChange={handlePriceRangeChange}
              className="slider-thumb"
            />
            <input
              type="range"
              name="maxPrice"
              min="0"
              max="10000"
              value={filters.priceRange[1]}
              onChange={handlePriceRangeChange}
              className="slider-thumb"
            />
          </div>
          <div className="flex justify-between text-gray-600 text-sm">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="location" className="text-gray-700 font-medium mb-1">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="e.g., New York, LA"
            className="border rounded px-3 py-2 text-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(filteredListings) && filteredListings.length > 0 ? (
          paginateListings(filteredListings).map((item) => (
            <Cards key={item._id} data={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No listings available.
          </p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-2 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <footer className="mt-12 text-center">
        <p className="text-gray-500">
          &copy; 2024 All Listings. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default AllListings;
