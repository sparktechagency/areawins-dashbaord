
import { GoogleGenAI } from "@google/genai";

class GeminiService {
  private ai: any;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  /**
   * Generates a short text insight for the dashboard based on performance metrics.
   */
  async generateDashboardInsight(stats: { revenue: string; activeUsers: string; activeBets: string; pendingWithdrawals: string }) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a senior sportsbook business analyst. Here are our current dashboard stats: 
        Revenue: ${stats.revenue}, Active Users: ${stats.activeUsers}, Active Bets: ${stats.activeBets}, Pending Withdrawals: ${stats.pendingWithdrawals}. 
        Provide a single-sentence snappy insight or warning for the admin.`,
        config: {
            systemInstruction: "Keep it brief, professional, and actionable. Avoid generic advice. Use active voice.",
            temperature: 0.8
        }
      });
      return response.text?.trim() || "Stats are holding steady. Monitor the withdrawal queue for high-value requests.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to generate smart insights at this moment.";
    }
  }
}

export default new GeminiService();
