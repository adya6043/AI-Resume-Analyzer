import React from "react";

function LoadingCard() {

  return (

    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border">

      <h2 className="text-2xl font-bold mb-6 text-center">
        🤖 AI is analyzing your resume...
      </h2>

      <div className="space-y-5">

        <div>
          <div className="flex justify-between">
            <span>📄 Reading Resume</span>
            <span>✓</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse w-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <span>🧠 Extracting Skills</span>
            <span>✓</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-purple-600 h-2 rounded-full animate-pulse w-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <span>📊 Calculating ATS Score</span>
            <span>✓</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-green-600 h-2 rounded-full animate-pulse w-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <span>🤖 Generating AI Feedback</span>
            <span>✓</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-pink-600 h-2 rounded-full animate-pulse w-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <span>🎯 Preparing Interview Questions</span>
            <span>✓</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-orange-500 h-2 rounded-full animate-pulse w-full"></div>
          </div>
        </div>

      </div>

    </div>

  );

}

export default LoadingCard;