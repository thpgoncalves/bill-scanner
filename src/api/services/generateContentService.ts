import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('API_KEY is not set in the environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateContentWithImage(imageUri: string, mimeType: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: mimeType,
          fileUri: imageUri,
        },
      },
      { text: "Get the measure value and the measure uuid." },
    ]);

    return result.response.text();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to generate content:", error.message);
    } else {
      console.error("Failed to generate content:", error);
    }
    throw new Error('Failed to generate content');
  }
}
