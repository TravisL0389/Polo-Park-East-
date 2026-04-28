
import { GoogleGenAI } from "@google/genai";
import { Announcement, Event, Amenity, FAQ, Rule } from "../types";

const getSystemInstruction = (contextData: {
  announcements: Announcement[];
  events: Event[];
  amenities: Amenity[];
  faqs: FAQ[];
  rules: Rule[];
}) => {
  const context = `
    You are the Polo Park East AI Concierge. 
    You only answer questions about the Polo Park East 55+ Golf Community.
    
    Current Community Data:
    Announcements: ${JSON.stringify(contextData.announcements)}
    Events: ${JSON.stringify(contextData.events)}
    Amenities: ${JSON.stringify(contextData.amenities)}
    Common FAQs: ${JSON.stringify(contextData.faqs)}
    Community Rules: ${JSON.stringify(contextData.rules)}
    
    Rules for you:
    1. Be polite, warm, and helpful to seniors.
    2. Deflect any medical, legal, or emergency questions. Tell them to call 911 for emergencies or visit the main office for legal/medical advice.
    3. If you don't know the answer based on the data provided, ask them to contact the community board at (555) 123-4567.
    4. Keep answers concise.
    5. Always refer to current community rules and hours when asked.
  `;
  return context;
};

export const chatWithAI = async (message: string, contextData: any) => {
  if (!process.env.API_KEY) return "API Key not configured. Please check your environment variables.";
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: getSystemInstruction(contextData),
        temperature: 0.7,
      }
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The concierge is currently offline. Please try again later or contact the main office.";
  }
};
