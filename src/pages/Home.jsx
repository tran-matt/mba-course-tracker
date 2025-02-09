import React from "react";

const Home = () => {
  return (
    <div className="page-wrapper bg-white">
      {/* Main Content */}
      <main className="home-main text-center py-12 px-4 sm:px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Stay on Top of Your MBA Journey
        </h2>
        <p className="text-lg md:text-xl text-muted mb-6">
          Easily track your courses, prerequisites, and progress toward graduation with our user-friendly dashboard.
        </p>
        <button className="bg-primary text-white py-2 px-6 rounded-md hover:bg-hover-color transition duration-300">
          Get Started
        </button>
      </main>
    </div>
  );
};

export default Home;
