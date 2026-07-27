export default function PaymentLog({ steps }) {
    return (
        <div className="bg-surface border border-gray-700 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-white font-semibold">Payment Log</h3>
                <p className="text-gray-400 text-sm">{steps.length} autonomous transactions • Base Sepolia Testnet</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Step</th>
                            <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Agent</th>
                            <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Amount</th>
                            <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Status</th>
                            <th className="text-left px-6 py-3 text-gray-400 text-sm font-medium">Tx Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {steps.map((step) => (
                            <tr key={step.step} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                                <td className="px-6 py-4 text-gray-300 text-sm">{step.step}</td>
                                <td className="px-6 py-4 text-gray-300 text-sm">{step.agent}</td>
                                <td className="px-6 py-4 text-success font-mono text-sm">${step.payment.amount} USDC</td>
                                <td className="px-6 py-4">
                                    <span className="bg-green-900 text-success text-xs px-2 py-1 rounded-full">
                                        ✓ Paid
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                                    {step.payment.txHash?.substring(0, 20)}...
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-700 flex justify-between">
                <span className="text-gray-400 text-sm">Total Spent</span>
                <span className="text-success font-mono font-semibold">$0.04 USDC</span>
            </div>
        </div>
    );
}