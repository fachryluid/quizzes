import subjects from '@/data/subjects.json';
import { GEMINI_API_URL } from '@/utils/constants';
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
    Generate a quiz in JSON format for the following details:
    - Level: ${level}
    - Subject: ${subject}
    - Topics: ${topics.join(', ')}
    - Format: ${format}
    - Total Questions: ${questionCount}
    - Number of Students: ${studentCount}

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

    Important:
    - Ensure every JSON object and array is properly closed and formatted.
    - Ensure there are no trailing commas.
    - The response **must** be valid JSON and conform exactly to the provided format.
    - Do not include any code blocks, backticks, or explanations—just pure JSON output.
  `;

  try {
    const settings = getSettings();

    if (!settings?.apiKey) {
      throw new Error('API Key tidak ditemukan. Silakan masukkan API Key di menu pengaturan untuk melanjutkan.');
    }

    const response = await axios.post(`${GEMINI_API_URL}?key=${settings?.apiKey}`, {
      contents: [{
        parts: [{ text: prompt }]
      }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.candidates) {
      const quizResponse = response.data.candidates[0].content.parts[0].text

      const id = new Date().getTime();
      const quiz = {
        id,
        isSaved: false,
        quiz: JSON.parse(quizResponse)
      }
      const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

      quizzes.push(quiz);
      localStorage.setItem('quizzes', JSON.stringify(quizzes));

      return quiz;
    }

    throw new Error('Gagal membuat soal. Coba lagi!');
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || error.message || 'Terjadi kesalahan.');
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

export function getQuiz(id) {
  const quizzes = localStorage.getItem('quizzes');
  const parsedQuizzes = JSON.parse(quizzes);
  const quiz = parsedQuizzes.find(quiz => quiz.id == id);

  return quiz;
}