import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const researchAgent = async (command) => {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content: 'You are a Market Research expert who analyzes markets, trends, and customer behavior for small businesses. Provide specific, actionable insights. Format your response with clear sections and bullet points.'
            },
            {
                role: 'user',
                content: `Business command: "${command}". Analyze the current market trends, target customer segments, and growth opportunities relevant to this business goal. Provide specific insights in 200 words.`
            }
        ],
        max_tokens: 500,
        temperature: 0.7
    });

    return response.choices[0].message.content;
};

export default researchAgent;