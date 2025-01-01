import React, { useContext, useState } from "react";
import { createProperty } from "../Utils/PostApi";
import { userContext } from "../Context/UserContext";

function PropertyForm() {
  const { userId } = useContext(userContext);
  const [ticked, setTicked] = useState(false);
  const [formData, setFormData] = useState({
    propertyName: "",
    propertySize: "",
    roomNumber: "",
    location: "",
    price: "",
    category: "",
    rentalDate: "",
    images: [],
    landlord_id: userId,
    status: false, 
    description: "",
  });

  const locations = ["New York", "San Francisco", "Los Angeles", "Chicago"];
  const categories = ["Apartment", "House", "Studio", "Villa"];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rentalDate") {
      const formattedDate = value.slice(0, 10);
      setFormData((prevData) => ({ ...prevData, [name]: formattedDate }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises)
      .then((base64Images) => {
        setFormData((prevData) => ({ ...prevData, images: base64Images }));
      })
      .catch((err) => {
        console.error("Error reading files:", err);
        setError("Failed to process the uploaded images. Please try again.");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const requiredFields = [
      "propertyName",
      "propertySize",
      "roomNumber",
      "location",
      "price",
      "category",
      "rentalDate",
      "description",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(
          `Please fill out the ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`
        );
        return;
      }
    }

    if (!formData.images.length) {
      setError("Please upload at least one image.");
      return;
    }

    setLoading(true);

    try {
      const response = await createProperty(formData);  
      alert("Property successfully submitted!");
    } catch (err) {
      console.error("Error submitting property:", err);
      setError(
        "An error occurred while submitting the property. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTickChange = () => {
    setTicked(!ticked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add a New Property
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              label: "Property Name",
              name: "propertyName",
              type: "text",
              placeholder: "Enter the property name",
            },
            {
              label: "Property Size (sq ft)",
              name: "propertySize",
              type: "number",
              placeholder: "Enter property size",
            },
            {
              label: "Number of Rooms",
              name: "roomNumber",
              type: "number",
              placeholder: "Enter the number of rooms",
            },
            {
              label: "Price ($)",
              name: "price",
              type: "number",
              placeholder: "Enter the price",
            },
            {
              label: "Description",
              name: "description",
              type: "textarea",
              placeholder: "Enter the property description",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-gray-700 font-medium mb-2"
              >
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={placeholder}
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-2"
            >
              Location
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="rentalDate"
              className="block text-gray-700 font-medium mb-2"
            >
              Rental Date
            </label>
            <input
              type="date"
              id="rentalDate"
              name="rentalDate"
              value={formData.rentalDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="images"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              You can upload multiple images.
            </p>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" value={ticked} onChange={handleTickChange} />
            <p>Agree to Our term and confition</p>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={!ticked || loading} 
              className={`px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                !ticked || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertyForm;
