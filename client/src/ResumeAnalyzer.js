import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Hero from "./Components/Hero";
import UploadCard from "./Components/UploadCard";
import LoadingCard from "./Components/LoadingCard";
import ResumeHistory from "./Components/ResumeHistory";
import EvaluationHistory from "./Components/EvaluationHistory";
import ScoreCard from "./Components/ScoreCard";
import SkillsCard from "./Components/SkillsCard";
import MissingSkills from "./Components/MissingSkills";
import AIAnalysis from "./Components/AIAnalysis";
import InterviewQuestions from "./Components/InterviewQuestion";
import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function ResumeAnalyzer() {
const token = localStorage.getItem("token");
console.log("TOKEN =", token);

const [file, setFile] = useState(null);

const [result, setResult] = useState(null);

const [history, setHistory] = useState([]);
const [evaluations, setEvaluations] = useState([]);

const [jobDescription, setJobDescription] = useState("");

const [loading, setLoading] = useState(false);


// Fetch History
// ======================

const fetchHistory = async () => {

  try {

    const res = await axios.get(
      "https://ai-resume-analyzer-1-lu4n.onrender.com/api/history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setHistory(res.data);

  } catch (error) {

    console.log(error);

    toast.error("Unable to load resume history.");

  }

};
const fetchEvaluationHistory = async () => {
  try {
    const res = await axios.get(
      "https://ai-resume-analyzer-1-lu4n.onrender.com/api/history/evaluations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEvaluations(res.data);

  } catch (error) {
    console.log(error);

    toast.error("Unable to load evaluation history.");
  }
};
// ======================
// Load History
// ======================

useEffect(() => {
  fetchHistory();
  fetchEvaluationHistory();
}, []);
// ======================
// Logout
// ======================

const logout = () => {

  localStorage.removeItem("token");

  window.location.href = "/login";

};
// ======================
// Download PDF
// ======================

const downloadPDF = () => {

  if (!result) return;

  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text("Resume Analyzer Report", 20, 20);

  doc.setFontSize(14);

  doc.text(`Resume Score : ${result.score}`, 20, 40);

  doc.text(`ATS Score : ${result.atsScore}%`, 20, 55);

  doc.save("Resume_Report.pdf");

};
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

  setLoading(true);

  try {

    const formData = new FormData();

    formData.append("resume", file);

    formData.append("jobDescription", jobDescription);

    const res = await axios.post(

      "https://ai-resume-analyzer-1-lu4n.onrender.com/api/upload",

      formData,

      {

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    );

    setResult(res.data);

    toast.success("Resume uploaded successfully!");

    fetchHistory();

  } catch (error) {

    console.log(error);

    toast.error(

      error.response?.data?.message ||

      "Upload Failed"

    );

  } finally {

    setLoading(false);

  }

};
// ======================
// Delete Resume
// ======================

const deleteResume = async (id) => {

  try {

    await axios.delete(

      `https://ai-resume-analyzer-1-lu4n.onrender.com/api/history/${id}`,

      {

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    );

    toast.success("Resume Deleted");

    fetchHistory();

  }

  catch (error) {

    console.log(error);

    toast.error("Delete Failed");

  }

};
return (

  <div className="min-h-screen bg-gray-100">

    <ToastContainer />

    <div className="max-w-7xl mx-auto p-8">

      <Hero logout={logout} />

<UploadCard
  file={file}
  loading={loading}
  jobDescription={jobDescription}
  setJobDescription={setJobDescription}
  handleFileChange={handleFileChange}
  handleUpload={handleUpload}
/>
{loading && <LoadingCard />}
<ResumeHistory
    history={history}
    deleteResume={deleteResume}
/>
<EvaluationHistory
  evaluations={evaluations}
/>
<ScoreCard result={result} />
<SkillsCard result={result} />
<MissingSkills result={result} />
<AIAnalysis result={result} />
{
  result && (

    <div className="flex justify-end mt-8">

      <button
        onClick={downloadPDF}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
      >
        📄 Download PDF
      </button>

    </div>

  )
}
<InterviewQuestions
  result={result}
  onEvaluationSaved={fetchEvaluationHistory}
/>

    </div>

  </div>

);
}
export default ResumeAnalyzer;
