const { GoogleGenAI } = require("@google/genai");
const Evaluation = require("../models/Evaluation");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.evaluateAnswer = async (req, res) => {
  try {
    const { question, userAnswer } = req.body;

    if (!question || !userAnswer) {
      return res.status(400).json({
        message: "Question and answer are required.",
      });
    }

    const prompt = `
You are a technical interviewer evaluating a candidate.

Question:
${question}

Candidate Answer:
${userAnswer}

Evaluate the candidate's answer.

Return ONLY valid JSON:

{
  "score": 0,
  "result": "Correct",
  "feedback": "Short explanation of the answer quality.",
  "improvement": "What the candidate should improve."
}

Rules:
- score must be between 0 and 10.
- result must be exactly one of:
  "Correct"
  "Needs Improvement"
  "Incorrect"
- Keep feedback concise.
- Keep improvement practical.
- Do not use markdown.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;

    console.log("===== ANSWER EVALUATION =====");
    console.log(text);

    let evaluation;

    try {
      evaluation = JSON.parse(text);
    } catch (error) {
      console.error("JSON Parse Error:", error);

      return res.status(500).json({
        message: "AI returned invalid evaluation.",
      });
    }

const savedEvaluation = await Evaluation.create({
  userId: req.user.id,
  question,
  userAnswer,
  score: evaluation.score,
  result: evaluation.result,
  feedback: evaluation.feedback,
  improvement: evaluation.improvement,
});

console.log("===== EVALUATION SAVED =====");
console.log(savedEvaluation._id);
   return res.status(200).json({
  ...evaluation,
  evaluationId: savedEvaluation._id,
});

  } catch (error) {
    console.error("Answer Evaluation Error:", error);

    return res.status(500).json({
      message: "AI evaluation failed.",
    });
  }
};