import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const competitorAgent = async (command, previousContext) => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content: 'You are a Competitor Analysis expert who identifies competitor strengths, weaknesses, and market positioning for small businesses. Provide specific, actionable insights. Format your response with clear sections and bullet points.'
            },
            {
                role: 'user',
                content: `Business command: "${command}". 
Previous market research context: ${previousContext}.
Analyze key competitors, their strategies, weaknesses to exploit, and positioning opportunities. Provide specific insights in 200 words.`
            }
        ],
        max_tokens: 500,
        temperature: 0.7
    });

    return response.choices[0].message.content;
};

export default competitorAgent;