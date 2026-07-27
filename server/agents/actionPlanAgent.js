import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const actionPlanAgent = async (command, previousContext) => {
    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content: 'You are a Business Strategy expert who creates detailed, actionable business plans for small businesses. Provide step-by-step action plans with clear timelines and KPIs. Format your response with clear sections and bullet points.'
            },
            {
                role: 'user',
                content: `Business command: "${command}".
Previous context from all agents: ${previousContext}.
Create a detailed 30-day action plan with specific steps, timelines, and KPIs to achieve this business goal. Make it practical and immediately executable.`
            }
        ],
        max_tokens: 500,
        temperature: 0.7
    });

    return response.choices[0].message.content;
};

export default actionPlanAgent;