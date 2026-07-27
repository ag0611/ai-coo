export default function StepCard({ step, status, payment }) {
    return (
        <div className={`bg-surface border rounded-xl p-4 transition-all ${status === 'active' ? 'border-accent' :
                status === 'done' ? 'border-success' :
                    'border-gray-700'
            }`}>
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${status === 'active' ? 'bg-accent text-white' :
                        status === 'done' ? 'bg-success text-white' :
                            'bg-gray-700 text-gray-400'
                    }`}>
                    {status === 'done' ? '✓' : step.step}
                </div>
                <div>
                    <p className={`font-semibold text-sm ${status === 'active' ? 'text-white' :
                            status === 'done' ? 'text-success' :
                                'text-gray-500'
                        }`}>
                        {step.agent}
                    </p>
                    {status === 'active' && (
                        <p className="text-accent text-xs animate-pulse">Working...</p>
                    )}
                    {status === 'done' && (
                        <p className="text-success text-xs font-mono">${payment?.amount} USDC paid</p>
                    )}
                    {status === 'pending' && (
                        <p className="text-gray-600 text-xs">Pending</p>
                    )}
                </div>
            </div>
        </div>
    );
}