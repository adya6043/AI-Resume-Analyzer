import React, { useState } from "react";

function InterviewQuestions({ result, onEvaluationSaved }) {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [practiceQuestion, setPracticeQuestion] = useState(null);
const [userAnswer, setUserAnswer] = useState("");
const [evaluation, setEvaluation] = useState(null);
const [evaluating, setEvaluating] = useState(false);
  if (!result) return null;

  const getDifficulty = (index) => {
    if (index < 2) return "Easy";
    if (index < 5) return "Medium";
    return "Hard";
  };

  const getCategory = (question) => {
    const q = question.toLowerCase();

    if (
      q.includes("java") ||
      q.includes("jdk") ||
      q.includes("jre") ||
      q.includes("jvm") ||
      q.includes("oop")
    ) {
      return "Java";
    }

    if (
      q.includes("spring") ||
      q.includes("dependency injection") ||
      q.includes("annotation")
    ) {
      return "Spring Boot";
    }

    if (
      q.includes("react") ||
      q.includes("virtual dom") ||
      q.includes("state") ||
      q.includes("props")
    ) {
      return "React";
    }

    if (
      q.includes("sql") ||
      q.includes("mysql") ||
      q.includes("database") ||
      q.includes("normalization")
    ) {
      return "Database";
    }

    if (
      q.includes("git") ||
      q.includes("branch")
    ) {
      return "Git";
    }

    return "General";
  };

  const getAnswer = (question) => {
    const q = question.toLowerCase();

    if (q.includes("oop concepts")) {
      return "OOP in Java is based on four main concepts: Encapsulation, Inheritance, Polymorphism, and Abstraction.";
    }

    if (
      q.includes("jdk") &&
      q.includes("jre") &&
      q.includes("jvm")
    ) {
      return "JDK is used to develop Java applications, JRE provides the environment to run them, and JVM executes Java bytecode.";
    }

    if (q.includes("dependency injection")) {
      return "Dependency Injection is a design pattern where Spring provides the required dependencies to a class instead of the class creating them itself.";
    }

    if (q.includes("spring boot annotations")) {
      return "Spring Boot annotations such as @SpringBootApplication, @RestController, @Service, and @Repository help configure and structure the application.";
    }

    if (q.includes("virtual dom")) {
      return "The Virtual DOM is a lightweight representation of the actual DOM. React compares changes in the Virtual DOM and updates only the necessary parts of the real DOM.";
    }

    if (q.includes("state") && q.includes("props")) {
      return "State is internal data managed by a component, while props are read-only data passed from a parent component to a child component.";
    }

    if (q.includes("sql") && q.includes("nosql")) {
      return "SQL databases are relational and use structured tables, while NoSQL databases use flexible structures such as documents, key-value pairs, or graphs.";
    }

    if (q.includes("normalization")) {
      return "Database normalization organizes data to reduce redundancy and improve data consistency. Common normal forms include 1NF, 2NF, and 3NF.";
    }

    if (q.includes("git branching")) {
      return "Git branching allows developers to work on separate features or fixes without affecting the main codebase. Changes can later be merged into the main branch.";
    }

    return "Review this topic carefully and prepare a concise explanation with a practical example.";
  };
  const getScoreStatus = (score) => {
  if (score >= 8) {
    return {
      label: "Strong Answer",
      className: "bg-green-100 text-green-700",
    };
  }

  if (score >= 5) {
    return {
      label: "Needs Improvement",
      className: "bg-yellow-100 text-yellow-700",
    };
  }

  return {
    label: "Weak Answer",
    className: "bg-red-100 text-red-700",
  };
};

  return (
    <div className="bg-purple-100 rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        🎯 Interview Questions
      </h2>

      <ul className="space-y-3">

        {(result.questions || []).map((question, index) => (

          <li
            key={index}
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-purple-100"
          >

            <div className="flex flex-wrap items-center gap-2">

              <span className="inline-flex items-center justify-center bg-purple-600 text-white font-bold rounded-lg px-3 py-1 text-sm">
                Q{index + 1}
              </span>

              <span className="font-medium">
                {question}
              </span>

              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  getDifficulty(index) === "Easy"
                    ? "bg-green-100 text-green-700"
                    : getDifficulty(index) === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {getDifficulty(index)}
              </span>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                {getCategory(question)}
              </span>

            </div>

            <div className="mt-4">

            <button
  onClick={() => {
    setPracticeQuestion(
      practiceQuestion === index ? null : index
    );
    setUserAnswer("");
    setEvaluation(null);
  }}
  className="ml-4 text-indigo-600 font-semibold hover:text-indigo-800 transition"
>
  🤔 Practice
</button> 
{practiceQuestion === index && (
  <div className="mt-4 bg-indigo-50 rounded-xl p-5 border border-indigo-200">

    <p className="font-semibold text-indigo-700 mb-2">
      🧠 Practice Mode
    </p>

    <p className="text-gray-700 mb-4">
      Try answering this question yourself before viewing the model answer.
    </p>

   <textarea
  placeholder="Write your answer here..."
  value={userAnswer}
  onChange={(e) => setUserAnswer(e.target.value)}
  className="w-full h-28 p-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
/>
<button
  onClick={async () => {
    if (!userAnswer.trim()) {
      alert("Please write your answer first.");
      return;
    }

    try {
      setEvaluating(true);
      setEvaluation(null);

      const response = await fetch(
        "http://https://ai-resume-analyzer-1-lu4n.onrender.com/api/answers/evaluate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,

          },
          body: JSON.stringify({
            question: question,
            userAnswer: userAnswer,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Evaluation failed");
      }

      console.log("Evaluation:", data);
      setEvaluation(data);
if (onEvaluationSaved) {
  onEvaluationSaved();
}
    } catch (error) {
      console.error("Evaluation Error:", error);
      alert("Could not evaluate answer.");
    } finally {
      setEvaluating(false);
    }
  }}
  disabled={evaluating}
  className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
>
  {evaluating ? "⏳ Evaluating..." : "🧠 Evaluate Answer"}
</button>
{evaluation && (
  <div className="mt-5 bg-white rounded-xl p-5 border border-indigo-200">

    <h3 className="font-bold text-lg text-indigo-700 mb-4">
      📊 Evaluation Result
    </h3>

    <div className="flex items-center gap-3">
      <p className="text-gray-700">
        <strong>Score:</strong>{" "}
        {evaluation.score ?? "N/A"}/10
      </p>

      {evaluation.score !== undefined && evaluation.score !== null && (
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            getScoreStatus(evaluation.score).className
          }`}
        >
          {getScoreStatus(evaluation.score).label}
        </span>
      )}
    </div>

    <p className="text-gray-700 mt-3">
      <strong>Result:</strong>{" "}
      {evaluation.result || "N/A"}
    </p>

    <p className="text-gray-700 mt-3">
      <strong>Feedback:</strong>{" "}
      {evaluation.feedback || "No feedback available."}
    </p>

    <p className="text-gray-700 mt-3">
      <strong>🚀 How to Improve:</strong>{" "}
      {evaluation.improvement || "Keep practicing this topic."}
    </p>

  </div>
)}

  </div>
)}
              <button
  onClick={() =>
    setOpenQuestion(
      openQuestion === index ? null : index
    )
  }
  className="ml-4 text-purple-600 font-semibold hover:text-purple-800 transition"
>
  {openQuestion === index
    ? "🙈 Hide Answer"
    : "💡 View Answer"}
</button>

      {openQuestion === index && (

  <div className="mt-4 bg-purple-50 rounded-xl p-4 border border-purple-200">

    <p className="font-semibold text-purple-700 mb-2">
      💡 Answer
    </p>

    <p className="text-gray-700 leading-7">
      {getAnswer(question)}
    </p>

  </div>

)}        

            </div>

          </li>

        ))}

      </ul>

    </div>
  );
}

export default InterviewQuestions;