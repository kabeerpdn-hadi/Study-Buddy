import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateCourse = async (topic, level = "beginner") => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Generate a complete online course about "${topic}" for ${level} level students.

Requirements:
- Course title (engaging)
- Course description (2-3 sentences)
- 5-8 lessons with:
  * Lesson name
  * Lesson description (1 sentence)
  * Lesson content (detailed explanation, 300-500 words each)

Format as valid JSON only, no extra text:
{
  "title": "...",
  "description": "...",
  "lessons": [
    {
      "name": "...",
      "description": "...",
      "content": "..."
    }
  ]
}`,
      },
    ],
  });

  const jsonText = completion.choices[0].message.content.trim();
  const jsonMatch = jsonText.match(/\{.*\}/s);
  return JSON.parse(jsonMatch[0]);
};

export const generateQuestions = async (lesson, level = "beginner") => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Generate 5-10 multiple choice questions about "${lesson}" for ${level} level students.

        Requirements:
        - Question (1 sentence)

        Format as valid JSON only, no extra text:
        [
          {
            "question": "What is...?",
            "options": ["full answer A", "full answer B", "full answer C", "full answer D"],
            "answer": "full answer A"  // must exactly match one of the options!
          }
        ]`,
      },
    ],
  });

  const jsonText = completion.choices[0].message.content.trim();
  const jsonMatch = jsonText.match(/\[.*\]/s);
  return JSON.parse(jsonMatch[0]);
};
