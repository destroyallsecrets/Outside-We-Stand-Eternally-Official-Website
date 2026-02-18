import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArchitectResponse = async (userPrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
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
    return "Connection to the void interrupted.";
  }
};