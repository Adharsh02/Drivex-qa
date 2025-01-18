import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export const getAIResponse = async (messages: Array<{ role: string; content: string }>) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error: any) {
    console.error('Error getting AI response:', error);
    
    if (error?.code === "insufficient_quota" || error.error?.type === 'insufficient_quota') {
      throw new Error("Sorry, the service is currently unavailable due to exceeded API quota. Please try again later.");
    }
    
    if (error.status === 429) {
      throw new Error("Too many requests. Please wait a moment before trying again.");
    }

    throw new Error("An unexpected error occurred. Please try again later.");
  }
};