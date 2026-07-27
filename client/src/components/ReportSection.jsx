import { useState } from 'react';

const agentIcons = {
    'Market Research': '🔍',
    'Competitor Analysis': '🏪',
    'Ad Copy': '📢',
    'Action Plan': '📋',
};

const agentColors = {
    'Market Research': 'border-accent',
    'Competitor Analysis': 'border-success',
    'Ad Copy': 'border-warning',
    'Action Plan': 'border-error',
};

export default function ReportSection({ step }) {
    const [open, setOpen] = useState(true);

    return (
        <div className={`bg-surface border-l-4 ${agentColors[step.agent] || 'border-accent'} border border-gray-700 rounded-xl overflow-hidden`}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-800 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm">
                        {step.step}
                    </div>
                    <span className="text-xl">{agentIcons[step.agent]}</span>
                    <div className="text-left">
                        <p className="text-white font-semibold">{step.agent}</p>
                        <p className="text-success text-xs font-mono">${step.payment.amount} USDC paid</p>
                    </div>
                </div>
                <span className="text-gray-400">{open ? '∧' : '∨'}</span>
            </button>

            {open && (
                <div className="px-6 pb-6 border-t border-gray-700">
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap mt-4">
                        {step.output}
                    </p>
                </div>
            )}
        </div>
    );
}