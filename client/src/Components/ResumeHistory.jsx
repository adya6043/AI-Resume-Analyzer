import React from "react";

function ResumeHistory({ history, deleteResume }) {

  return (

    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-5">
        📂 Resume History
      </h2>

      {

        history.length === 0

        ?

        (

          <p className="text-gray-500">
            No resumes uploaded yet.
          </p>

        )

        :

        history.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg p-6 mb-5 hover:shadow-xl transition-all duration-300"
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="text-xl font-bold">
                  📄 {item.fileName}
                </h3>

                <p className="text-gray-500 mt-2">
                  Uploaded:
                  {" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>

              </div>

              <button
                onClick={() => deleteResume(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
              >
                Delete 🗑️
              </button>

            </div>

            <div className="grid grid-cols-2 gap-5 mt-6">

              <div className="bg-blue-50 rounded-xl p-5">

                <p className="text-gray-500">
                  Resume Score
                </p>

                <h2 className="text-3xl font-bold text-blue-700">
                  {item.score}
                </h2>

              </div>

              <div className="bg-purple-50 rounded-xl p-5">

                <p className="text-gray-500">
                  ATS Score
                </p>

                <h2 className="text-3xl font-bold text-purple-700">
                  {item.atsScore}%
                </h2>

              </div>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default ResumeHistory;