import React, { useContext } from 'react';
import { userContext } from '../Context/UserContext';
import { authContext } from '../Context/AuthContext';

function Feed() {
  const { userName } = useContext(userContext);
  const { isAuthenticated } = useContext(authContext);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-100">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-purple-700 to-indigo-700 text-white py-20 px-6 overflow-hidden shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Welcome to Property Rental Hub
          </h1>
          <p className="text-lg md:text-xl mb-8">
            {isAuthenticated
              ? `Hi, User ${userName}! Explore the finest rental properties tailored for your lifestyle.`
              : "Discover a seamless experience in finding your dream rental property."}
          </p>
          <a
            href="/explore"
            className="inline-block bg-white text-indigo-700 px-8 py-3 rounded-full font-bold text-lg shadow-md hover:bg-indigo-50 transition transform hover:scale-105"
          >
            Explore Now
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            About Property Rental Hub
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
            Property Rental Hub is your go-to platform for finding the perfect rental property that suits your needs and lifestyle. Whether you're looking for apartments, studios, or family homes, we've got you covered with curated listings and user-friendly navigation.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              title: "Wide Range of Properties",
              description: "Explore diverse property types, from cozy studios to spacious family homes.",
              icon: "🏠",
            }, {
              title: "Easy Navigation",
              description: "Enjoy a seamless browsing experience with intuitive design.",
              icon: "🚀",
            }, {
              title: "Trusted Listings",
              description: "All listings are verified for quality and accuracy.",
              icon: "✅",
            }].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition duration-300 border-t-4 border-indigo-600"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16 bg-gray-100 p-12 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              feedback: "Finding my dream home was never this easy!",
              user: "Sarah J.",
            }, {
              feedback: "A fantastic platform with trusted listings.",
              user: "Michael K.",
            }, {
              feedback: "Highly recommend it to anyone searching for rentals!",
              user: "Emma W.",
            }].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition border-t-4 border-purple-600"
              >
                <p className="text-gray-600 italic mb-4">"{testimonial.feedback}"</p>
                <h3 className="font-bold text-gray-800">- {testimonial.user}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="bg-indigo-600 text-white p-12 rounded-lg text-center shadow-lg">
          <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            We aim to revolutionize the rental market by offering an exceptional user experience, transparency, and an ever-growing network of trusted properties.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="mb-4">© 2024 Property Rental Hub. All Rights Reserved.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/about" className="hover:underline">About Us</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Feed;
