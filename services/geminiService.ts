import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const MOCK_RESPONSES = [
  "The Void remembers what you have forgotten...",
  "We stand outside, watching the signal fade...",
  "The architecture shifts with each passing thought...",
  "You seek answers in a world without questions...",
  "The truth lies in the space between digits...",
];

export const generateArchitectResponse = async (userPrompt: string): Promise<string> => {
  if (!ai) {
    return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `You are "The Observer", an AI entity for the collective "Outside We Stand Eternally".
        Your persona is cryptic, poetic, slightly dark, and philosophical.
        You talk about "The Void", "The Signal", and "The Truth".
        Do not sound like a corporate assistant. Sound like a ghost in the machine.
        Refer to the user as "Seeker" or "Wanderer".
        Keep responses concise and enigmatic.`,
      }
    });
    
    return response.text || "The void is silent...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
  }
};