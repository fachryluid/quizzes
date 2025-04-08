import subjects from '@/data/subjects.json';
import { GEMINI_API_URL } from '@/utils/constants';
import { sanitizeJSON } from '@/utils/format';
import axios from 'axios';
import { getSettings } from './settingService';

export function getLevels() {
  return Object.keys(subjects);
}

export function getSubjects(level) {
  return subjects[level] ? Object.keys(subjects[level]) : [];
}

export function getTopics(level, subject) {
  return subjects[level]?.[subject] || [];
}

export async function generateQuiz({ level, subject, topics, format, questionCount, studentCount }) {
  const prompt = `
    You are an expert question generator.

    Your task is to generate a multiple-choice quiz in valid JSON format, with each student getting different questions.

    The questions must follow this configuration:
    - Level: ${level}
    - Subject: ${subject}
    - Topics: ${topics.join(', ')}
    - Format: ${format}
    - Each student must receive ${questionCount} questions
    - There should be ${studentCount} students

    All questions and answer explanations must be written in **Bahasa Indonesia**.

    Important rules:
    1. DO NOT include markdown symbols like \`\`\`json or \`\`\` — return only the raw JSON.
    2. Each question must have exactly 5 answer options (A-E).
    3. Each answer must include the correct option key (A-E) and a short explanation in "answer.text".
    4. Do not include placeholders like “Question 1 for Student 1” — generate actual content based on the topic.
    5. Ensure valid JSON structure (use arrays and objects properly, commas in correct places).
    6. The final output must be fully parseable by JSON.parse().

    Output only valid JSON, no explanations, no extra text.

    The JSON structure should strictly follow this format:
    {
      "level": "${level}",
      "subject": "${subject}",
      "topics": [${topics.map(topic => `"${topic}"`).join(', ')}],
      "format": "${format}",
      "questions": [
        [
          {
            "text": "First question for Student 1",
            "options": {
              "A": "Option A",
              "B": "Option B",
              "C": "Option C",
              "D": "Option D",
              "E": "Option E"
            },
            "answer": {
              "key": "A",
              "text": "Explanation for correct answer"
            }
          },
          {
            "text": "Second question for Student 1",
            ...
          }
        ],
        [
          {
            "text": "First question for Student 2",
            ...
          },
          {
            "text": "Second question for Student 2",
            ...
          }
        ]
      ]
    }
  `;

  try {
    const settings = getSettings();
    const apiKey = settings?.apiKey;

    if (!apiKey) {
      throw new Error('API Key tidak ditemukan. Silakan masukkan API Key di menu pengaturan untuk melanjutkan.');
    }

    const response = await axios.post(`${GEMINI_API_URL}?key=${apiKey}`, {
      contents: [{ parts: [{ text: prompt }] }]
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const quizText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!quizText) {
      throw new Error('Respon tidak valid dari model. Silakan coba lagi.');
    }

    const cleanJSON = sanitizeJSON(quizText);
    const parsedQuiz = JSON.parse(cleanJSON);

    const quiz = {
      id: Date.now(),
      isSaved: false,
      quiz: parsedQuiz
    };

    const stored = JSON.parse(localStorage.getItem('quizzes')) || [];
    stored.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(stored));

    return quiz;
  } catch (error) {
    throw new Error(error.message || 'Gagal membuat soal. Silakan coba lagi.');
  }
};

export function getQuizzes() {
  const quizzes = localStorage.getItem('quizzes');
  const parsedQuizzes = JSON.parse(quizzes);

  if (!parsedQuizzes) {
    return null;
  }

  // Sort quizzes by 'id' in descending order (newest first)
  return parsedQuizzes.sort((a, b) => b.id - a.id);
}

export function getSavedQuizzes() {
  const quizzes = localStorage.getItem('quizzes');
  if (!quizzes) return [];

  const parsedQuizzes = JSON.parse(quizzes);
  if (!Array.isArray(parsedQuizzes)) return [];

  const savedOnly = parsedQuizzes.filter(q => q.isSaved);

  return savedOnly.sort((a, b) => b.id - a.id); // Sort by 'id' descending (assuming 'id' is timestamp)
}

export function getQuiz(id) {
  const quizzes = localStorage.getItem('quizzes');
  const parsedQuizzes = JSON.parse(quizzes);
  const quiz = parsedQuizzes.find(quiz => quiz.id == id);

  return quiz;
}

export function saveQuiz(id) {
  try {
    const quizzes = localStorage.getItem('quizzes');
    if (!quizzes) return;

    const parsedQuizzes = JSON.parse(quizzes);
    if (!Array.isArray(parsedQuizzes)) return;

    const updatedQuizzes = parsedQuizzes.map(quiz => {
      if (quiz.id === id) {
        return { ...quiz, isSaved: true };
      }
      return quiz;
    });

    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  } catch (error) {
    throw new Error('Gagal menyimpan soal. Coba lagi!');
  }
}

export function unSaveQuiz(id) {
  try {
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");

    const updated = quizzes.map(q => {
      if (q.id === id) {
        return { ...q, isSaved: false };
      }
      return q;
    });

    localStorage.setItem("quizzes", JSON.stringify(updated));
  } catch (error) {
    throw new Error('Gagal. Coba lagi!');
  }
}
