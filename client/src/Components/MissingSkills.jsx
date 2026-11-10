import React from "react";

function MissingSkills({ result }) {

  if (!result) return null;

  return (

    <div className="bg-red-50 rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        ❌ Missing Skills
      </h2>

      {

        result.missingSkills.length === 0

        ?

        <p className="text-green-600 font-semibold">
          Great! No missing skills found.
        </p>

        :

        <div className="flex flex-wrap gap-3">

          {

            result.missingSkills.map((skill, index) => (

              <span
                key={index}
                className="bg-red-500 text-white px-4 py-2 rounded-full"
              >
                {skill}
              </span>

            ))

          }

        </div>

      }

    </div>

  );

}

export default MissingSkills;