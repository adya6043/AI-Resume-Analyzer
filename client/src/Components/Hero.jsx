import React from "react";

function Hero({ logout }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl mb-8">

      <div className="flex justify-between items-start">

        <div>

          <h1 className="text-5xl font-extrabold">
            🚀 ResumeIQ AI
          </h1>

          <p className="text-xl mt-3">
            AI Powered Resume Analyzer
          </p>

          <p className="mt-4 text-blue-100 max-w-2xl">
            Analyze resumes with ATS Score, AI Feedback,
            Skill Detection, Interview Questions and
            Resume History.
          </p>

        </div>

        <button
          onClick={logout}
          className="bg-white text-red-600 font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Hero;