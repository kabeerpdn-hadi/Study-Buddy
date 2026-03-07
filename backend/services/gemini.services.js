import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateCourse = async (topic, level = "beginner") => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Generate a complete online course about "${topic}" for ${level} level students.

Requirements:
- Course title (engaging)
- Course description (2-3 sentences)
- 5-8 lessons with:
  * Lesson name
  * Lesson description (1 sentence)  
  * Lesson content (detailed explanation, 300-500 words each, include examples/code)
  
Format as valid JSON:
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
}`;

  const result = await model.generateContent(prompt);
  const jsonText = result.response.text().trim();
  
  // Extract JSON from response
  const jsonMatch = jsonText.match(/\{.*\}/s);
  return JSON.parse(jsonMatch[0]);
};
