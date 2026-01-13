
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { ProjectFile } from "../types";

const MODEL_NAME = 'gemini-3-pro-preview';

export class CodeArchitectService {
  private ai: GoogleGenAI;
  private chatSession: Chat | null = null;

  constructor() {
    // Initializing the GenAI client using the required named parameter and environment variable.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private buildSystemInstruction(files: ProjectFile[]): string {
    const context = files.map(f => `File: ${f.path}\n\`\`\`${f.language}\n${f.content}\n\`\`\``).join('\n\n');
    
    return `You are a world-class senior full-stack engineer and software architect.
    Your goal is to help the user modify, improve, and understand their GitHub project code.
    
    CRITICAL INSTRUCTIONS:
    1. When proposing code changes, provide the full file content or clear patches.
    2. Be concise but technically accurate.
    3. Use professional developer terminology.
    4. If the user asks to "do something", analyze the existing code first to ensure architectural consistency.
    
    PROJECT CONTEXT:
    ${context}
    
    The user's project was likely created with lovable.dev, so it uses modern React, Tailwind, and Vite.`;
  }

  async startSession(files: ProjectFile[]) {
    // Creating a chat session with the specified model and system instructions.
    this.chatSession = this.ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: this.buildSystemInstruction(files),
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 4000 }
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.chatSession) {
      throw new Error("Chat session not initialized. Please upload project files first.");
    }

    try {
      const response = await this.chatSession.sendMessage({ message });
      // Accessing the text property directly as it is not a method.
      return response.text || "No response from AI.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
    }
  }

  async *sendMessageStream(message: string) {
    if (!this.chatSession) {
      throw new Error("Chat session not initialized.");
    }

    const responseStream = await this.chatSession.sendMessageStream({ message });
    for await (const chunk of responseStream) {
      // Correctly extracting generated text from each stream chunk using the .text property.
      const c = chunk as GenerateContentResponse;
      yield c.text || "";
    }
  }
}

export const architectService = new CodeArchitectService();
