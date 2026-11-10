import React from "react";

function SkillsCard({ result }) {

  if (!result) return null;

  return (

    <div className="bg-white p-6 rounded-xl shadow mt-8">

      <h2 className="text-2xl font-bold mb-5">
        🛠 Skills Detected
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <h3 className="font-bold text-blue-600">
            Languages
          </h3>

          <p>
            {result.extractedSkills.languages.join(", ") || "None"}
          </p>

        </div>

        <div>

          <h3 className="font-bold text-green-600">
            Frameworks
          </h3>

          <p>
            {result.extractedSkills.frameworks.join(", ") || "None"}
          </p>

        </div>

        <div>

          <h3 className="font-bold text-purple-600">
            Databases
          </h3>

          <p>
            {result.extractedSkills.databases.join(", ") || "None"}
          </p>

        </div>

        <div>

          <h3 className="font-bold text-orange-600">
            Tools
          </h3>

          <p>
            {result.extractedSkills.tools.join(", ") || "None"}
          </p>

        </div>

      </div>

    </div>

  );

}

export default SkillsCard;