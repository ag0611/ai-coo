import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Search, Users, Megaphone, ClipboardList, Download, RotateCcw, CheckCircle, Shield } from 'lucide-react';

const agentConfig = {
    'Market Research': { icon: Search, color: '#7167FF' },
    'Competitor Analysis': { icon: Users, color: '#4C8DFF' },
    'Ad Copy': { icon: Megaphone, color: '#F3B13F' },
    'Action Plan': { icon: ClipboardList, color: '#15C27A' },
};

export default function Report() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const data = state?.data;

    if (!data) return (
        <div style={{ background: '#070709', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#A0A0B2', marginBottom: '16px' }}>No report data found.</p>
                <button onClick={() => navigate('/')} style={{ background: '#7167FF', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer' }}>Go Back</button>
            </div>
        </div>
    );

    return (
        <div style={{ background: '#070709', minHeight: '100vh' }}>
            {/* Navbar */}
            <div style={{
                padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(13,13,18,0.8)', backdropFilter: 'blur(20px)',
                position: 'sticky', top: 0, zIndex: 10,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', background: '#7167FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>A</span>
                    </div>
                    <span style={{ color: 'white', fontWeight: 700 }}>AI COO</span>
                    <span style={{ color: '#A0A0B2', fontSize: '13px', marginLeft: '8px' }}>Report</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/')}
                        style={{ background: 'rgba(255,255,255,0.06)', color: '#A0A0B2', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <RotateCcw size={14} /> Run Again
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        style={{ background: 'linear-gradient(135deg, #7167FF, #4C8DFF)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                        <Download size={14} /> Download Report
                    </motion.button>
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
                {/* Command */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    style={{ background: '#121218', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', padding: '24px', marginBottom: '32px' }}>
                    <p style={{ color: '#A0A0B2', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Business Command</p>
                    <p style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>"{data.report.command}"</p>
                </motion.div>

                {/* KPI Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
                    {[
                        { label: 'Agents Deployed', value: '4', color: '#7167FF', icon: '⚡' },
                        { label: 'Total Cost', value: '$0.04 USDC', color: '#15C27A', icon: '💳' },
                        { label: 'Policy Guard', value: 'Passed', color: '#15C27A', icon: '🛡️' },
                        { label: 'Network', value: 'Base Sepolia', color: '#4C8DFF', icon: '🔗' },
                    ].map((kpi, i) => (
                        <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            style={{ background: '#121218', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', padding: '20px' }}>
                            <p style={{ color: '#A0A0B2', fontSize: '12px', marginBottom: '12px' }}>{kpi.label}</p>
                            <p style={{ color: kpi.color, fontSize: '22px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{kpi.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Report Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                    {data.steps.map((step, i) => {
                        const config = agentConfig[step.agent] || { icon: Search, color: '#7167FF' };
                        const Icon = config.icon;
                        return (
                            <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                style={{ background: '#121218', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${config.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${config.color}25` }}>
                                        <Icon size={20} color={config.color} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>{step.agent}</p>
                                        <p style={{ color: '#15C27A', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace' }}>
                                            ${step.payment.amount} USDC • {step.payment.txHash?.substring(0, 16)}...
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#15C27A15', padding: '4px 12px', borderRadius: '20px', border: '1px solid #15C27A25' }}>
                                        <CheckCircle size={12} color="#15C27A" />
                                        <span style={{ color: '#15C27A', fontSize: '12px', fontWeight: 600 }}>Paid</span>
                                    </div>
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <div style={{ color: '#A0A0B2', fontSize: '14px', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                                        {step.output}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Payment Log */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    style={{ background: '#121218', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={18} color="#7167FF" />
                        <p style={{ color: 'white', fontWeight: 700 }}>Payment Log</p>
                        <span style={{ color: '#A0A0B2', fontSize: '13px', marginLeft: '4px' }}>4 autonomous transactions • Base Sepolia Testnet</span>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                {['Step', 'Agent', 'Amount', 'Status', 'Tx Hash'].map(h => (
                                    <th key={h} style={{ padding: '12px 24px', textAlign: 'left', color: '#A0A0B2', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.steps.map((step) => (
                                <tr key={step.step} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <td style={{ padding: '16px 24px', color: '#A0A0B2', fontSize: '14px' }}>{step.step}</td>
                                    <td style={{ padding: '16px 24px', color: 'white', fontSize: '14px', fontWeight: 500 }}>{step.agent}</td>
                                    <td style={{ padding: '16px 24px', color: '#15C27A', fontSize: '14px', fontFamily: 'JetBrains Mono, monospace' }}>${step.payment.amount} USDC</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{ background: '#15C27A15', color: '#15C27A', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: '1px solid #15C27A25' }}>✓ Paid</span>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: '#A0A0B2', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace' }}>{step.payment.txHash?.substring(0, 24)}...</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <span style={{ color: '#A0A0B2', fontSize: '14px' }}>Total Spent</span>
                        <span style={{ color: '#15C27A', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>$0.04 USDC</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}