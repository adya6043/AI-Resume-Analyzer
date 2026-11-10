import React from "react";

function EvaluationHistory({ evaluations }) {
  return (
    <div className="bg-indigo-50 rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        📊 Evaluation History
      </h2>

      {evaluations.length === 0 ? (
        <p className="text-gray-500">
          No interview evaluations yet.
        </p>
      ) : (
        evaluations.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md p-6 mb-5"
          >

            <div className="flex justify-between items-start gap-4">

              <div>
                <p className="text-sm text-gray-500">
                  Evaluated:
                  {" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                <h3 className="text-lg font-bold mt-2">
                  ❓ {item.question}
                </h3>
              </div>

              <span
                className={`text-sm font-bold px-3 py-1 rounded-full ${
                  item.score >= 8
                    ? "bg-green-100 text-green-700"
                    : item.score >= 5
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.score}/10
              </span>

            </div>

            <div className="mt-5 bg-gray-50 rounded-xl p-4">

              <p className="font-semibold text-gray-700">
                📝 Your Answer
              </p>

              <p className="text-gray-600 mt-2">
                {item.userAnswer}
              </p>

            </div>

            <p className="mt-4">
              <strong>Result:</strong>{" "}
              {item.result}
            </p>

            <div className="mt-4">
              <p className="font-semibold text-gray-700">
                💬 Feedback
              </p>

              <p className="text-gray-600 mt-1">
                {item.feedback}
              </p>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-gray-700">
                🚀 How to Improve
              </p>

              <p className="text-gray-600 mt-1">
                {item.improvement}
              </p>
            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default EvaluationHistory;