import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, Zap, BarChart3, FileText, Search, TrendingUp } from 'lucide-react';
import { executeCommand } from '../utils/api';

const chips = ['Marketing', 'Sales', 'Expansion', 'Pricing', 'Competitors'];

const bentoCards = [
    { icon: Search, title: 'Market Research Agent', desc: 'Deep analysis of trends, customer segments, and growth opportunities in real-time.', size: 'large', color: '#7167FF' },
    { icon: Shield, title: 'Policy Guard', desc: 'Every payment validated against spending limits before execution.', size: 'medium', color: '#15C27A' },
    { icon: Zap, title: 'x402 Payment Engine', desc: 'Autonomous USDC payments on Base Sepolia testnet.', size: 'medium', color: '#4C8DFF' },
    { icon: BarChart3, title: 'Competitor Analysis', desc: 'Identify weaknesses and positioning opportunities against competitors.', size: 'large', color: '#F3B13F' },
    { icon: FileText, title: 'Report Generator', desc: 'Compiled business intelligence with citations.', size: 'small', color: '#7167FF' },
    { icon: TrendingUp, title: 'Action Planning', desc: '30-day executable roadmap with KPIs.', size: 'large', color: '#15C27A' },
];

export default function Home() {
    const [command, setCommand] = useState('');
    const [error, setError] = useState('');
    const [mousePos, setMousePos] = useState({ x: 0.7, y: 0.2 });
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
        window.addEventListener('mousemove', handler);
        return () => window.removeEventListener('mousemove', handler);
    }, []);

    const handleSubmit = () => {
        if (!command.trim()) { setError('Enter a business command.'); return; }
        navigate('/execute', { state: { command } });
    };

    const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } };

    return (
        <div style={{ background: '#070709', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

            {/* Volumetric light */}
            <div style={{
                position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
                background: `radial-gradient(ellipse 800px 600px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(113,103,255,0.07) 0%, transparent 70%)`,
                transition: 'background 0.4s ease',
            }} />
            <div style={{
                position: 'fixed', top: '-100px', right: '-100px', width: '600px', height: '600px',
                background: 'radial-gradient(ellipse, rgba(180,210,255,0.04) 0%, transparent 65%)',
                filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
            }} />

            {/* Hero */}
            <div style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '120px 24px 60px', position: 'relative', zIndex: 1,
            }}>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    style={{
                        fontSize: 'clamp(72px, 12vw, 140px)', fontWeight: 900, textAlign: 'center',
                        lineHeight: 0.95, marginBottom: '28px', letterSpacing: '-4px', color: 'white',
                    }}>
                    AI COO
                </motion.h1>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                    style={{ color: '#6B6B80', fontSize: '17px', textAlign: 'center', marginBottom: '20px', maxWidth: '420px', lineHeight: 1.5 }}>
                    Autonomous Business Operations Platform
                </motion.p>

                {/* Plain "Powered by x402" text */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    style={{ color: '#6B6B80', fontSize: '13px', textAlign: 'center', marginBottom: '36px' }}>
                    Powered by x402
                </motion.p>

                {/* Command Console */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    style={{ width: '100%', maxWidth: '700px' }}>
                    <div style={{
                        background: 'rgba(13,13,20,0.95)', borderRadius: '18px',
                        border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(24px)',
                        overflow: 'hidden',
                        boxShadow: '0 0 80px rgba(113,103,255,0.06), 0 40px 100px rgba(0,0,0,0.5)',
                    }}>
                        {/* Console header */}
                        <div style={{
                            padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <span style={{ color: '#4B4B60', fontSize: '12px', letterSpacing: '0.5px' }}>aicoo · command console</span>
                            <span style={{ color: '#4B4B60', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace' }}>USDC · Base Sepolia</span>
                        </div>

                        <div style={{ padding: '20px 18px' }}>
                            <textarea
                                value={command}
                                onChange={e => { setCommand(e.target.value); setError(''); }}
                                onKeyDown={handleKey}
                                placeholder="Increase my café sales"
                                style={{
                                    width: '100%', background: 'transparent', border: 'none', outline: 'none',
                                    color: 'white', fontSize: '18px', lineHeight: 1.5, resize: 'none',
                                    height: '72px', fontFamily: 'Inter, sans-serif', fontWeight: 500,
                                }}
                            />
                            {error && <p style={{ color: '#F75A5A', fontSize: '12px', marginBottom: '8px' }}>{error}</p>}

                            {/* Chips */}
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                {chips.map(chip => (
                                    <motion.button key={chip} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                        onClick={() => setCommand(chip + ' strategy for my business')}
                                        style={{
                                            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                                            color: '#8B8BA0', padding: '5px 14px', borderRadius: '20px',
                                            fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                                        }}>{chip}</motion.button>
                                ))}
                            </div>

                            {/* Bottom row — Policy Guard indicator and budget removed, just deploy button */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(113,103,255,0.35)' }}
                                    whileTap={{ scale: 0.97 }} onClick={handleSubmit}
                                    style={{
                                        background: 'linear-gradient(135deg, #7167FF, #5B6DFF)',
                                        color: 'white', border: 'none', padding: '11px 24px',
                                        borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                                    }}>
                                    <Zap size={14} /> Deploy AI COO <ArrowUpRight size={13} />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    style={{ display: 'flex', gap: '56px', marginTop: '56px' }}>
                    {[['4', 'AI Agents'], ['$0.04', 'Per Session'], ['x402', 'Protocol'], ['Base', 'Testnet']].map(([val, label]) => (
                        <div key={label} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '22px', fontWeight: 700, color: 'white' }}>{val}</div>
                            <div style={{ fontSize: '12px', color: '#4B4B60', marginTop: '4px' }}>{label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bento Grid */}
            <div style={{ padding: '80px 32px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    style={{ fontSize: '42px', fontWeight: 900, color: 'white', textAlign: 'center', marginBottom: '16px' }}>
                    Everything your business needs.
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    style={{ color: '#6B6B80', textAlign: 'center', marginBottom: '48px', fontSize: '17px' }}>
                    Autonomously executed.
                </motion.p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                    {bentoCards.map((card, i) => (
                        <motion.div key={card.title}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -3, boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 20px ${card.color}10` }}
                            style={{
                                gridColumn: card.size === 'large' ? 'span 2' : 'span 1',
                                background: '#0D0D14', borderRadius: '18px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                padding: '28px', transition: 'all 0.3s ease',
                            }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '10px',
                                background: `${card.color}12`, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', marginBottom: '18px',
                                border: `1px solid ${card.color}20`,
                            }}>
                                <card.icon size={20} color={card.color} />
                            </div>
                            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{card.title}</h3>
                            <p style={{ color: '#6B6B80', fontSize: '13px', lineHeight: 1.6 }}>{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer style={{ padding: '80px 32px 40px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', marginTop: '60px' }}>
                <div style={{
                    position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)',
                    fontSize: 'clamp(100px, 18vw, 220px)', fontWeight: 900, color: 'rgba(255,255,255,0.015)',
                    whiteSpace: 'nowrap', userSelect: 'none', letterSpacing: '-6px', lineHeight: 1,
                }}>AI COO</div>
                <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, color: 'white', marginBottom: '48px', lineHeight: 1.05 }}>
                        Build Smarter.<br />Operate Faster.
                    </h2>
                   
                </div>
            </footer>
        </div>
    );
}