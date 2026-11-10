import React from "react";

function UploadCard({
  jobDescription,
  setJobDescription,
  handleFileChange,
  handleUpload,
  loading,
}) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        📋 Job Description
      </h2>

      <textarea
        placeholder="Paste complete Job Description here..."
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(e.target.value)
        }
        className="w-full h-48 border-2 border-gray-200 rounded-xl p-5 focus:outline-none focus:ring-4 focus:ring-blue-300 resize-none"
      />

      <h2 className="text-2xl font-bold mt-8 mb-4">
        📄 Upload Resume
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="w-full border-2 border-dashed border-blue-400 rounded-xl p-6 cursor-pointer bg-blue-50 hover:bg-blue-100 transition"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition disabled:bg-gray-400"
      >
        {
          loading
            ? "Analyzing Resume..."
            : "Upload Resume"
        }
      </button>

    </div>

  );

}

export default UploadCard;