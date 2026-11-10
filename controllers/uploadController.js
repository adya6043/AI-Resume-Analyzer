const fs = require("fs");
const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.uploadResume = async (req, res) => {
  try {

    // =========================
    // CHECK FILE
    // =========================

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // =========================
    // READ PDF
    // =========================

    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    const extractedText = pdfData.text;

    // =========================
    // JOB DESCRIPTION
    // =========================

    const jobDescription =
      req.body.jobDescription || "";

    // =========================
    // SKILLS DATABASE
    // =========================

    const skillsDatabase = {
      languages: [
        "Java",
        "JavaScript",
        "Python",
        "C++",
      ],

      frameworks: [
        "Spring Boot",
        "React",
        "Node.js",
        "Express",
      ],

      databases: [
        "MySQL",
        "MongoDB",
        "PostgreSQL",
      ],

      tools: [
        "Git",
        "GitHub",
        "Postman",
        "Swagger",
      ],
    };

    // =========================
    // EXTRACT SKILLS
    // =========================

    const extractedSkills = {
      languages: [],
      frameworks: [],
      databases: [],
      tools: [],
    };

    for (const category in skillsDatabase) {

      skillsDatabase[category].forEach((skill) => {

        if (
          extractedText
            .toLowerCase()
            .includes(skill.toLowerCase())
        ) {
          extractedSkills[category].push(skill);
        }

      });

    }

    console.log("===== EXTRACTED SKILLS =====");
    console.log(extractedSkills);

    // =========================
    // RESUME SCORE
    // =========================

    let score = 0;

    const strengths = [];

    const missingSkills = [];

    const totalSkills =
      extractedSkills.languages.length +
      extractedSkills.frameworks.length +
      extractedSkills.databases.length +
      extractedSkills.tools.length;

    score += totalSkills * 10;

    // Projects

    if (
      extractedText
        .toLowerCase()
        .includes("projects")
    ) {

      score += 15;

      strengths.push(
        "Good project section"
      );

    }

    // GitHub

    if (
      extractedText
        .toLowerCase()
        .includes("github")
    ) {

      score += 10;

      strengths.push(
        "GitHub profile included"
      );

    }

    // Backend bonus

    if (
      extractedSkills.frameworks.includes("Spring Boot") ||
      extractedSkills.frameworks.includes("Node.js")
    ) {

      score += 15;

      strengths.push(
        "Strong backend development skills"
      );

    }

    // =========================
    // MISSING SKILLS
    // =========================

    const recommendedSkills = [
      "Docker",
      "Kubernetes",
      "AWS",
      "Redis",
    ];

    recommendedSkills.forEach((skill) => {

      if (
        !extractedText
          .toLowerCase()
          .includes(skill.toLowerCase())
      ) {

        missingSkills.push(skill);

      }

    });

    // Max score

    if (score > 100) {
      score = 100;
    }

    console.log("===== RESUME SCORE =====");
    console.log(score);

    // =========================
    // ATS MATCHING SYSTEM
    // =========================

    const matchedSkills = [];

    const missingATSskills = [];

    const allResumeSkills = [
      ...extractedSkills.languages,
      ...extractedSkills.frameworks,
      ...extractedSkills.databases,
      ...extractedSkills.tools,
    ];

    const jdText =
      jobDescription.toLowerCase();

    allResumeSkills.forEach((skill) => {

      if (
        jdText.includes(skill.toLowerCase())
      ) {

        matchedSkills.push(skill);

      }

    });

    const atsSkills = [
      "React",
      "Node.js",
      "MongoDB",
      "Docker",
      "AWS",
      "Redis",
      "Kubernetes",
      "Java",
      "Spring Boot",
    ];

    atsSkills.forEach((skill) => {

      if (
        jdText.includes(skill.toLowerCase()) &&
        !allResumeSkills.includes(skill)
      ) {

        missingATSskills.push(skill);

      }

    });

    let atsScore = 0;

    const totalJDskills =
      atsSkills.filter((skill) =>
        jdText.includes(skill.toLowerCase())
      ).length;

    if (totalJDskills > 0) {

      const matchedJDskills =
        matchedSkills.filter((skill) =>
          atsSkills.includes(skill)
        ).length;

      atsScore = Math.round(
        (matchedJDskills / totalJDskills) * 100
      );

    }

    // Keep ATS score between 0 and 100

    if (atsScore > 100) {
      atsScore = 100;
    }

    console.log("===== ATS SCORE =====");
    console.log(atsScore);

    // =========================
    // GEMINI AI FEEDBACK
    // =========================

    const aiPrompt = `
Analyze this resume and provide:

1. Resume strengths
2. Missing skills
3. ATS improvement suggestions
4. Career improvement advice

Resume Skills:
${JSON.stringify(extractedSkills)}

Resume Score:
${score}

ATS Score:
${atsScore}

Missing Skills:
${missingSkills.join(", ")}

Job Description:
${jobDescription}

Give the answer in a clear format using these headings:

Strengths
Weaknesses
Suggestions
Career Advice
`;

    let aiResponse = "";

    // =========================
    // GEMINI REQUEST
    // =========================

  try {

  const result =
    await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: aiPrompt,
    });

      aiResponse =
        result.text;
        aiResponse = aiResponse
  .replace(/###/g, "")
  .replace(/---/g, "")
  .trim();

    } catch (error) {

      console.log(
        "========== GEMINI ERROR =========="
      );

      console.log(
        "MESSAGE:",
        error.message
      );

      console.log(
        "NAME:",
        error.name
      );

      console.log(
        "STACK:",
        error.stack
      );

      aiResponse = `
AI service temporarily unavailable.

Suggestions:

- Add Docker skills
- Learn AWS cloud deployment
- Improve backend scalability knowledge
- Add more real-world projects
`;

    }

    console.log("===== AI RESPONSE =====");
    console.log(aiResponse);

    // =========================
    // INTERVIEW QUESTIONS
    // =========================

    const questions = [];

    // Java

    if (
      extractedSkills.languages.includes("Java")
    ) {

      questions.push(
        "Explain OOP concepts in Java."
      );

      questions.push(
        "What is the difference between JDK, JRE, and JVM?"
      );

    }

    // Spring Boot

    if (
      extractedSkills.frameworks.includes("Spring Boot")
    ) {

      questions.push(
        "Explain Dependency Injection in Spring Boot."
      );

      questions.push(
        "What is the use of Spring Boot annotations?"
      );

    }

    // React

    if (
      extractedSkills.frameworks.includes("React")
    ) {

      questions.push(
        "What is Virtual DOM in React?"
      );

      questions.push(
        "Difference between state and props?"
      );

    }

    // MySQL

    if (
      extractedSkills.databases.includes("MySQL")
    ) {

      questions.push(
        "Difference between SQL and NoSQL?"
      );

      questions.push(
        "Explain normalization in databases."
      );

    }

    // Git

    if (
      extractedSkills.tools.includes("Git")
    ) {

      questions.push(
        "Explain Git branching strategy."
      );

    }

    console.log("===== INTERVIEW QUESTIONS =====");
    console.log(questions);

    // =========================
    // SAVE TO MONGODB
    // =========================

    const savedResume =
      await Resume.create({

        user: req.user.id,

        fileName: req.file.filename,

        score,

        atsScore,

        extractedSkills,

        strengths,

        missingSkills,

        feedback: aiResponse,

        questions,

        matchedSkills,

        missingATSskills,

      });

    console.log("===== SAVED TO DB =====");
    console.log(savedResume._id);

    // =========================
    // RESPONSE
    // =========================

    res.json({

      message:
        "Resume parsed successfully",

      extractedSkills,

      score,

      strengths,

      missingSkills,

      feedback: aiResponse,

      questions,

      atsScore,

      matchedSkills,

      missingATSskills,

    });

  } catch (error) {

    console.log(
      "===== UPLOAD CONTROLLER ERROR ====="
    );

    console.log(error);

    res.status(500).json({
      message: "Error parsing resume",
    });

  }

};

// =========================
// GET RESUME HISTORY
// =========================

exports.getResumeHistory = async (req, res) => {

  try {

    const resumes =
      await Resume.find({
        user: req.user.id,
      }).sort({
        createdAt: -1,
      });

    res.json(resumes);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching history",
    });

  }

};