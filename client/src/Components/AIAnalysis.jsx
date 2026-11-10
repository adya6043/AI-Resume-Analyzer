import React from "react";

function AIAnalysis({ result }) {

  if (!result) return null;

  const feedback = result.feedback || "";

  // Escape special regex characters
  const escapeRegex = (text) => {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // Extract a section from Gemini response
  const getSection = (title, nextTitles = []) => {

    const nextPattern =
      nextTitles.length > 0
        ? nextTitles.map(escapeRegex).join("|")
        : "$";

    const pattern = new RegExp(
      `(?:^|\\n)\\s*#{0,6}\\s*${escapeRegex(title)}\\s*:?[ \\t]*\\n([\\s\\S]*?)(?=\\n\\s*#{0,6}\\s*(?:${nextPattern})\\s*:?[ \\t]*(?:\\n|$)|$)`,
      "i"
    );

    const match = feedback.match(pattern);

    return match ? match[1].trim() : "";
  };

  const strengths = getSection(
    "Strengths",
    ["Weaknesses", "Suggestions", "Career Advice", "Advice"]
  );

  const weaknesses = getSection(
    "Weaknesses",
    ["Suggestions", "Career Advice", "Advice"]
  );

  const suggestions = getSection(
    "Suggestions",
    ["Career Advice", "Advice"]
  );

  const careerAdvice =
    getSection("Career Advice") ||
    getSection("Advice");

  // Render Gemini markdown safely as React elements
  const renderInlineText = (text, lineIndex) => {

    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {

      if (
        part.startsWith("**") &&
        part.endsWith("**")
      ) {

        return (
          <strong key={`${lineIndex}-${index}`}>
            {part.slice(2, -2)}
          </strong>
        );

      }

      return (
        <React.Fragment key={`${lineIndex}-${index}`}>
          {part}
        </React.Fragment>
      );

    });

  };

  const renderContent = (text) => {

    if (!text) {
      return <span>No information available.</span>;
    }

    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => {

        let cleanLine = line.trim();

        // Remove markdown headings
        cleanLine = cleanLine.replace(
          /^#{1,6}\s*/,
          ""
        );

        // Remove bullet markers
        const isBullet =
          /^[-*•]\s+/.test(cleanLine);

        cleanLine = cleanLine.replace(
          /^[-*•]\s+/,
          ""
        );

        return (
          <div
            key={index}
            className={isBullet ? "mb-3" : "mb-3"}
          >

            {isBullet && (
              <span className="mr-2">
                •{" "}
              </span>
            )}

            {renderInlineText(
              cleanLine,
              index
            )}

          </div>
        );

      });

  };

  return (

    <div className="mt-10">

      <h2 className="text-3xl font-bold mb-6">
        🤖 AI Analysis
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* ================= STRENGTHS ================= */}

        <div className="bg-green-50 rounded-2xl shadow p-6">

          <h3 className="text-xl font-bold mb-4 text-green-700">
            💪 Strengths
          </h3>

          <div className="text-gray-700 leading-7">
            {renderContent(
              strengths || feedback
            )}
          </div>

        </div>

        {/* ================= WEAKNESSES ================= */}

        <div className="bg-red-50 rounded-2xl shadow p-6">

          <h3 className="text-xl font-bold mb-4 text-red-700">
            ⚠️ Weaknesses
          </h3>

          <div className="text-gray-700 leading-7">
            {renderContent(
              weaknesses ||
              "No weaknesses found."
            )}
          </div>

        </div>

        {/* ================= SUGGESTIONS ================= */}

        <div className="bg-blue-50 rounded-2xl shadow p-6">

          <h3 className="text-xl font-bold mb-4 text-blue-700">
            🚀 Suggestions
          </h3>

          <div className="text-gray-700 leading-7">
            {renderContent(
              suggestions ||
              "No suggestions available."
            )}
          </div>

        </div>

        {/* ================= CAREER ADVICE ================= */}

        <div className="bg-purple-50 rounded-2xl shadow p-6">

          <h3 className="text-xl font-bold mb-4 text-purple-700">
            🎯 Career Advice
          </h3>

          <div className="text-gray-700 leading-7">
            {renderContent(
              careerAdvice ||
              "Keep learning and improving your skills."
            )}
          </div>

        </div>

      </div>

    </div>

  );

}

export default AIAnalysis;