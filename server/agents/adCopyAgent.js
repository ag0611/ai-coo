import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const adCopyAgent = async (command, previousContext) => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content: 'You are an Advertising Copy expert who creates high-converting ad copies for small businesses. Provide specific, ready-to-use ad copies for different platforms. Format your response with clear sections and bullet points.'
            },
            {
                role: 'user',
                content: `Business command: "${command}".
Previous context: ${previousContext}.
Create 3 high-converting ad copies — one for Instagram, one for Google Ads, and one for WhatsApp. Make them specific, compelling, and ready to use.`
            }
        ],
        max_tokens: 500,
        temperature: 0.7
    });

    return response.choices[0].message.content;
};

export default adCopyAgent;