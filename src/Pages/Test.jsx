import React from 'react';

function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            Discover who we are and what drives us forward.
          </p>
        </div>

        {/* Mission Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to provide exceptional solutions that inspire and empower
            individuals and businesses. Our focus is on innovation, integrity,
            and excellence in everything we do.
          </p>
        </section>

        {/* Team Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">Jane Doe</h3>
              <p className="text-gray-500">CEO & Founder</p>
            </div>
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">John Smith</h3>
              <p className="text-gray-500">Lead Developer</p>
            </div>
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">Alice Johnson</h3>
              <p className="text-gray-500">Marketing Head</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li className="mb-2">Commitment to excellence</li>
            <li className="mb-2">Innovation and creativity</li>
            <li className="mb-2">Integrity and transparency</li>
            <li className="mb-2">Customer-first approach</li>
          </ul>
        </section>

        {/* Call to Action Section */}
        <section className="text-center bg-indigo-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Join Us on Our Journey</h2>
          <p className="mb-6">
            Become a part of our story and experience the difference we bring to
            the table.
          </p>
          <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-md shadow-md hover:bg-indigo-50">
            Contact Us
          </button>
        </section>
      </div>
    </div>
  );
}

export default Test;

