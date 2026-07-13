import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResumeAnalyzer() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
const token = localStorage.getItem("token");

  // ======================
  // Fetch History
  // ======================

  const fetchHistory = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/history",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setHistory(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchHistory();

  }, []);

  // ======================
  // File Change
  // ======================

  const handleFileChange = (e) => {

    setFile(e.target.files[0]);

  };

  // ======================
  // Upload Resume
  // ======================

  const handleUpload = async () => {

    if (!file) {

      toast.error("Please select a PDF");

      return;

    }

    const formData = new FormData();

    formData.append("resume", file);

    formData.append(
      "jobDescription",
      jobDescription
    );

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setResult(res.data);

      toast.success(
        "Resume analyzed successfully!"
      );

      fetchHistory();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Upload Failed"
      );

    }

    setLoading(false);

  };
    // ======================
  // Delete Resume
  // ======================

  const deleteResume = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/history/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success("Resume Deleted");

      fetchHistory();

    } catch (error) {

      toast.error("Delete Failed");

    }

  };

  // ======================
  // Logout
  // ======================

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  // ======================
  // PDF Download
  // ======================

  const downloadPDF = () => {

    if (!result) return;

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text("AI Resume Analyzer Report", 20, 20);

    doc.setFontSize(14);

    doc.text(
      `Resume Score : ${result.score}`,
      20,
      40
    );

    doc.text(
      `ATS Score : ${result.atsScore}%`,
      20,
      55
    );

    doc.save("Resume_Report.pdf");

  };

  // ======================
  // UI
  // ======================

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">

            AI Resume Analyzer 🚀

          </h1>

          <button

            onClick={logout}

            className="bg-red-500 text-white px-5 py-2 rounded-lg"

          >

            Logout

          </button>

        </div>

        <textarea

          placeholder="Paste Job Description"

          value={jobDescription}

          onChange={(e)=>setJobDescription(e.target.value)}

          className="border rounded-lg w-full h-40 p-4 mb-5"

        />

        <input

          type="file"

          accept=".pdf"

          onChange={handleFileChange}

          className="border rounded-lg w-full p-3 mb-5"

        />

        <button

          onClick={handleUpload}

          disabled={loading}

          className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"

        >

          {

            loading

            ?

            "Analyzing Resume..."

            :

            "Upload Resume"

          }

        </button>

        <ToastContainer />

        {/* Resume History */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Resume History
          </h2>

          {
            history.length === 0
            ?
            (
              <p>No resumes uploaded yet.</p>
            )
            :
            (
              history.map((item) => (

                <div
                  key={item._id}
                  className="bg-gray-100 p-5 rounded-lg shadow mb-4"
                >

                  <h3 className="font-bold text-lg">
                    {item.fileName}
                  </h3>

                  <p>
                    Resume Score :
                    <strong> {item.score}</strong>
                  </p>

                  <p>
                    ATS Score :
                    <strong> {item.atsScore}%</strong>
                  </p>

                  <button
                    onClick={() => deleteResume(item._id)}
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              ))
            )
          }

        </div>

        {/* Result */}

        {

          result && (

            <>

              <div className="flex justify-end mt-8">

                <button
                  onClick={downloadPDF}
                  className="bg-green-600 text-white px-5 py-2 rounded"
                >
                  Download PDF
                </button>

              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-8">

                <div className="bg-blue-100 p-6 rounded-xl">

                  <h2 className="text-2xl font-bold mb-5">
                    Resume Score
                  </h2>

                  <div className="w-40 h-40 mx-auto">

                    <CircularProgressbar
                      value={result.score}
                      text={`${result.score}%`}
                      styles={buildStyles({
                        pathColor: "#2563eb",
                        textColor: "#111827",
                        trailColor: "#dbeafe"
                      })}
                    />

                  </div>

                </div>

                <div className="bg-indigo-100 p-6 rounded-xl">

                  <h2 className="text-2xl font-bold mb-5">
                    ATS Score
                  </h2>

                  <div className="w-40 h-40 mx-auto">

                    <CircularProgressbar
                      value={result.atsScore}
                      text={`${result.atsScore}%`}
                      styles={buildStyles({
                        pathColor: "#4f46e5",
                        textColor: "#111827",
                        trailColor: "#d1d5db"
                      })}
                    />

                  </div>

                </div>

              </div>
``````jsx
              {/* Skills */}

              <div className="bg-white p-6 rounded-xl shadow mt-8">

                <h2 className="text-2xl font-bold mb-5">
                  Skills Detected
                </h2>

                <p>
                  <strong>Languages:</strong>{" "}
                  {result.extractedSkills.languages.join(", ")}
                </p>

                <p>
                  <strong>Frameworks:</strong>{" "}
                  {result.extractedSkills.frameworks.join(", ")}
                </p>

                <p>
                  <strong>Databases:</strong>{" "}
                  {result.extractedSkills.databases.join(", ")}
                </p>

                <p>
                  <strong>Tools:</strong>{" "}
                  {result.extractedSkills.tools.join(", ")}
                </p>

              </div>

              {/* Missing Skills */}

              <div className="bg-red-100 p-6 rounded-xl mt-8">

                <h2 className="text-2xl font-bold mb-4">
                  Missing Skills
                </h2>

                <ul className="list-disc pl-6">

                  {result.missingSkills.map((item, index) => (

                    <li key={index}>{item}</li>

                  ))}

                </ul>

              </div>

              {/* AI Feedback */}

              <div className="bg-yellow-100 p-6 rounded-xl mt-8">

                <h2 className="text-2xl font-bold mb-4">
                  AI Feedback
                </h2>

                <p className="whitespace-pre-line">

                  {Array.isArray(result.feedback)
                    ? result.feedback.join("\n")
                    : result.feedback}

                </p>

              </div>

              {/* Interview Questions */}

              <div className="bg-purple-100 p-6 rounded-xl mt-8">

                <h2 className="text-2xl font-bold mb-4">
                  Interview Questions
                </h2>

                <ul className="list-disc pl-6">

                  {result.questions.map((item, index) => (

                    <li key={index}>{item}</li>

                  ))}

                </ul>

              </div>

            </>

          )

        }

      </div>

    </div>

  );

}

export default ResumeAnalyzer;

