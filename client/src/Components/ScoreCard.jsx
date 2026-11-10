import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function ScoreCard({ result }) {

  if (!result) return null;

  return (

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

  );

}

export default ScoreCard;