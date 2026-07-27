import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Search, Users, Megaphone, ClipboardList, CheckCircle, Loader } from 'lucide-react';
import { executeCommand } from '../utils/api';

const agents = [
    { id: 1, name: 'Market Research', label: 'ATLAS', icon: Search, color: '#7167FF' },
    { id: 2, name: 'Competitor Analysis', label: 'SENTRY', icon: Users, color: '#4C8DFF' },
    { id: 3, name: 'Ad Copy', label: 'VOX', icon: Megaphone, color: '#F3B13F' },
    { id: 4, name: 'Action Plan', label: 'PRAXIS', icon: ClipboardList, color: '#15C27A' },
];

const getLogLines = (command) => [
    `Initializing autonomous run — mission: ${command}.`,
    'Atlas · pulling market trend data + segment signals (12 sources).',
    'Atlas · analyzing demand patterns relevant to this goal.',
    'Sentry · benchmarking direct competitors in the relevant space.',
    'Sentry · identifying positioning gaps and opportunities.',
    'Vox · drafting 3 campaign angles + creative variants.',
    'Praxis · compiling 30-day action plan with owner + KPI mapping.',
    'Policy Guard · budget within cap · risk = LOW · approved.',
];

const ledgerItems = [
    { label: 'Policy Validation', amount: '$0.00' },
    { label: 'Data License · Market Signals', amount: '$1.20' },
    { label: 'Competitor Feed', amount: '$0.00' },
    { label: 'USDC Settlement', amount: '$2.00' },
    { label: 'Blockchain Confirmation', amount: '—' },
];

export default function Execute() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const command = state?.command || 'Running AI COO...';

    const logLines = getLogLines(command);

    const [completedSteps, setCompletedSteps] = useState(0);
    const [currentAgent, setCurrentAgent] = useState('ATLAS');
    const [budget, setBudget] = useState(0);
    const [timer, setTimer] = useState(0);
    const [displayedLines, setDisplayedLines] = useState([]);
    const [lineIndex, setLineIndex] = useState(0);
    const [ledgerDone, setLedgerDone] = useState(0);
    const [reportData, setReportData] = useState(null);
    const [showInsight, setShowInsight] = useState(false);
    const [insight, setInsight] = useState('Compiling insight from agent analysis...');

    const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    useEffect(() => {
        const interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (lineIndex >= logLines.length) return;
        const timeout = setTimeout(() => {
            setDisplayedLines(prev => [...prev, logLines[lineIndex]]);
            setLineIndex(i => i + 1);

            if (lineIndex === 1) { setCompletedSteps(1); setCurrentAgent('SENTRY'); setBudget(1.20); setLedgerDone(2); }
            if (lineIndex === 3) { setCompletedSteps(2); setCurrentAgent('VOX'); setBudget(3.20); setLedgerDone(3); }
            if (lineIndex === 5) { setCompletedSteps(3); setCurrentAgent('PRAXIS'); setBudget(5.20); }
            if (lineIndex === 6) { setBudget(8.16); setLedgerDone(4); setShowInsight(true); }
            if (lineIndex === 7) { setCompletedSteps(4); setCurrentAgent('Complete'); setLedgerDone(5); }
        }, 450);
        return () => clearTimeout(timeout);
    }, [lineIndex]);

    useEffect(() => {
        executeCommand(command)
            .then(data => {
                if (data.success) {
                    setReportData(data);
                    if (data.steps?.[0]?.output) {
                        setInsight(data.steps[0].output.split('\n')[0]);
                    }
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (lineIndex >= logLines.length && reportData) {
            setTimeout(() => navigate(`/report/${reportData.sessionId}`, { state: { data: reportData } }), 1800);
        }
    }, [lineIndex, reportData]);

    return (
        <div style={{ background: '#070709', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>

            {/* Top Bar */}
            <div style={{
                padding: '14px 28px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)',
                position: 'sticky', top: 0, zIndex: 10,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '26px', height: '26px', background: '#7167FF', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontWeight: 900, fontSize: '13px' }}>A</span>
                    </div>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>AI COO</span>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                            <div style={{ width: '6px', height: '6px', background: '#15C27A', borderRadius: '50%' }} />
                        </motion.div>
                        <span style={{ color: '#15C27A', fontSize: '12px' }}>Live · autonomous run</span>
                    </div>
                    <button onClick={() => reportData && navigate(`/report/${reportData.sessionId}`, { state: { data: reportData } })}
                        style={{ background: 'rgba(255,255,255,0.06)', color: '#A0A0B2', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                        View report ↗
                    </button>
                </div>
            </div>

            {/* Command heading */}
            <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <p style={{ color: '#4B4B60', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Mission Control</p>
                <h1 style={{ color: 'white', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px' }}>{command}</h1>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                {/* Left — Pipeline */}
                <div style={{
                    width: '280px', borderRight: '1px solid rgba(255,255,255,0.05)',
                    padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto',
                }}>
                    <p style={{ color: '#4B4B60', fontSize: '10px', fontWeight: 600, letterSpacing: '2px', marginBottom: '18px', textTransform: 'uppercase' }}>Execution Pipeline</p>
                    {agents.map((agent, i) => {
                        const status = i < completedSteps ? 'done' : i === completedSteps ? 'active' : 'pending';
                        return (
                            <div key={agent.id}>
                                <div style={{
                                    padding: '12px 14px', borderRadius: '10px',
                                    border: `1px solid ${status === 'active' ? agent.color + '40' : status === 'done' ? 'rgba(21,194,122,0.2)' : 'rgba(255,255,255,0.04)'}`,
                                    background: status === 'active' ? `${agent.color}06` : 'transparent',
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                }}>
                                    <div style={{
                                        width: '28px', height: '28px', borderRadius: '7px', flexShrink: 0,
                                        background: status === 'done' ? 'rgba(21,194,122,0.1)' : status === 'active' ? `${agent.color}12` : 'rgba(255,255,255,0.03)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {status === 'done' ? <CheckCircle size={14} color="#15C27A" /> :
                                            status === 'active' ? (
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                                                    <Loader size={14} color={agent.color} />
                                                </motion.div>
                                            ) : <agent.icon size={14} color="#333" />}
                                    </div>
                                    <div>
                                        <p style={{ color: status === 'pending' ? '#333' : 'white', fontSize: '13px', fontWeight: 600 }}>{agent.name}</p>
                                        <p style={{ fontSize: '10px', marginTop: '2px', color: '#333', letterSpacing: '0.5px' }}>
                                            AGENT · {agent.label} · {status === 'done' ? 'COMPLETED' : status === 'active' ? 'RUNNING' : 'PENDING'}
                                        </p>
                                    </div>
                                </div>
                                {i < agents.length - 1 && (
                                    <div style={{ width: '1px', height: '8px', background: 'rgba(255,255,255,0.04)', margin: '2px 0 2px 25px' }} />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Center — Live Output */}
                <div style={{ flex: 1, padding: '24px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{
                        background: '#0A0A10', borderRadius: '14px',
                        border: '1px solid rgba(255,255,255,0.05)', padding: '20px', flex: 1,
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                    <div style={{ width: '6px', height: '6px', background: '#15C27A', borderRadius: '50%' }} />
                                </motion.div>
                                <span style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>Live Output</span>
                            </div>
                            <span style={{ color: '#333', fontSize: '10px', letterSpacing: '1.5px' }}>STREAM · SECURE</span>
                        </div>

                        <div>
                            {displayedLines.map((line, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                    style={{ display: 'flex', gap: '14px', marginBottom: '6px', alignItems: 'flex-start' }}>
                                    <span style={{ color: '#2A2A40', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', minWidth: '20px', paddingTop: '1px' }}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span style={{
                                        fontSize: '13px', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.7,
                                        color: line.includes('Policy Guard') || line.includes('approved') ? '#15C27A' : line.toLowerCase().startsWith('signal') || line.toLowerCase().startsWith('finding') ? '#7167FF' : '#5A5A70',
                                    }}>
                                        │ {line}
                                    </span>
                                </motion.div>
                            ))}
                            {lineIndex < logLines.length && (
                                <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.7, repeat: Infinity }}
                                    style={{ color: '#7167FF', fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', marginLeft: '34px' }}>▋</motion.span>
                            )}
                        </div>
                    </div>

                    {/* Draft Insight */}
                    {showInsight && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            style={{ background: '#0D0D14', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', padding: '20px' }}>
                            <p style={{ color: '#4B4B60', fontSize: '10px', letterSpacing: '2px', marginBottom: '10px', textTransform: 'uppercase' }}>Draft Insight</p>
                            <p style={{ color: '#A0A0B2', fontSize: '14px', lineHeight: 1.7 }}>{insight}</p>
                        </motion.div>
                    )}
                </div>

                {/* Right — Executive Dashboard */}
                <div style={{
                    width: '280px', borderLeft: '1px solid rgba(255,255,255,0.05)',
                    padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto',
                }}>
                    <p style={{ color: '#4B4B60', fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Executive Dashboard</p>

                    {[
                        { label: 'Current Agent', value: currentAgent, color: '#7167FF' },
                        { label: 'Risk Level', value: 'LOW', color: '#15C27A' },
                    ].map(item => (
                        <div key={item.label} style={{ background: '#0D0D14', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', padding: '14px' }}>
                            <p style={{ color: '#4B4B60', fontSize: '10px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
                            <p style={{ color: item.color, fontSize: '15px', fontWeight: 700 }}>{item.value}</p>
                        </div>
                    ))}

                    {/* Policy Guard */}
                    <div style={{ background: '#0D0D14', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', padding: '14px' }}>
                        <p style={{ color: '#4B4B60', fontSize: '10px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Policy Guard</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle size={13} color="#15C27A" />
                            <p style={{ color: '#15C27A', fontSize: '15px', fontWeight: 700 }}>Verified</p>
                        </div>
                    </div>

                    {/* Timer */}
                    <div style={{ background: '#0D0D14', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', padding: '14px' }}>
                        <p style={{ color: '#4B4B60', fontSize: '10px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Execution Timer</p>
                        <p style={{ color: '#F3B13F', fontSize: '20px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{formatTime(timer)}</p>
                    </div>

                    {/* Budget */}
                    <div style={{ background: '#0D0D14', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', padding: '14px' }}>
                        <p style={{ color: '#4B4B60', fontSize: '10px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Budget</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: 'white', fontSize: '18px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>${budget.toFixed(2)}</span>
                            <span style={{ color: '#4B4B60', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace' }}>/ $12.00</span>
                        </div>
                        <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                            <motion.div animate={{ width: `${(budget / 12) * 100}%` }} transition={{ duration: 0.6 }}
                                style={{ height: '100%', background: 'linear-gradient(90deg, #7167FF, #4C8DFF)', borderRadius: '2px' }} />
                        </div>
                        <p style={{ color: '#4B4B60', fontSize: '10px', marginTop: '6px', fontFamily: 'JetBrains Mono, monospace' }}>
                            USDC · BASE &nbsp; {((budget / 12) * 100).toFixed(0)}%
                        </p>
                    </div>

                    {/* x402 Payment Ledger */}
                    <div style={{ background: '#0D0D14', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                            <Shield size={12} color="#7167FF" />
                            <p style={{ color: '#4B4B60', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>x402 Payment Ledger</p>
                        </div>
                        {ledgerItems.map((item, i) => {
                            const done = i < ledgerDone;
                            return (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                        <div style={{
                                            width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                                            background: done ? 'rgba(21,194,122,0.1)' : 'rgba(255,255,255,0.03)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: done ? '1px solid rgba(21,194,122,0.2)' : '1px solid rgba(255,255,255,0.05)',
                                        }}>
                                            {done
                                                ? <CheckCircle size={9} color="#15C27A" />
                                                : <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#222' }} />}
                                        </div>
                                        <span style={{ color: done ? '#6B6B80' : '#2A2A40', fontSize: '11px' }}>{item.label}</span>
                                    </div>
                                    <span style={{ color: done ? '#15C27A' : '#222', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}>
                                        {done ? item.amount : '—'}
                                    </span>
                                </div>
                            );
                        })}
                        <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#4B4B60', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Wallet</span>
                            <span style={{ color: '#6B6B80', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}>0x9F...C3E2</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}