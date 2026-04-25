import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Cpu,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Loader2
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { useI18n } from './i18n/I18nContext';
import LanguageSelector from './i18n/LanguageSelector';

const Logo: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div className="logo" style={style}>
    Patron<span>AI</span>ge
  </div>
);

const TerminalHUD: React.FC = () => {
  const [inferenceCount, setInferenceCount] = useState(1240582);
  const [activeUnderwriters] = useState(14);
  const [avgApy, setAvgApy] = useState(24.5);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setInferenceCount(prev => prev + Math.floor(Math.random() * 100));
      if (Math.random() > 0.8) setAvgApy(prev => +(prev + (Math.random() - 0.5) * 0.1).toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-hud glass" style={{
      fontFamily: 'monospace',
      padding: '2rem',
      backgroundColor: '#000',
      border: '1px solid var(--accent-color)',
      boxShadow: '0 0 40px rgba(255,107,0,0.1)',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '12px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', fontSize: '0.8rem' }}>
        <div style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>PATRON_TERMINAL_v1.0.4</div>
        <div style={{ opacity: 0.5 }}>CONNECTED_NODES: {activeUnderwriters}</div>
      </div>

      <div className="grid grid-2" style={{ gap: '2rem' }}>
        <div className="glass" style={{ padding: '1.5rem', background: 'rgba(255,107,0,0.05)' }}>
          <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.5rem' }}>TOTAL_INFERENCE_STREAM</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
            {inferenceCount.toLocaleString()} <span style={{ fontSize: '0.8rem' }}>TOKENS/S</span>
          </div>
        </div>
        <div className="glass" style={{ padding: '1.5rem', background: 'rgba(255,107,0,0.05)' }}>
          <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.5rem' }}>AVG_PORTFOLIO_ALIGNMENT</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
            {avgApy}% <span style={{ fontSize: '0.8rem', color: '#10b981' }}>+0.4%</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '1rem' }}>LIVE_UNDERWRITING_FEED</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'TX-4091', project: 'NeuralFlow', status: 'deployed', compute: 'H100 x 8' },
            { id: 'TX-4092', project: 'LlamaScale', status: 'scaling', compute: 'A100 x 16' },
            { id: 'TX-4093', project: 'VisionPro', status: 'underwriting', compute: 'H100 x 4' }
          ].map((tx, i) => (
            <div key={i} style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', opacity: 1 - i * 0.2 }}>
              <span style={{ color: 'var(--accent-color)' }}>[{tx.id}]</span>
              <span>{tx.project}</span>
              <span style={{ color: tx.status === 'deployed' ? '#10b981' : '#f59e0b' }}>{tx.status.toUpperCase()}</span>
              <span style={{ opacity: 0.5 }}>{tx.compute}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: 'rgba(255,255,255,0.03)',
        fontSize: '0.75rem',
        borderLeft: '2px solid var(--accent-color)'
      }}>
        &gt; SYSTEM_STATUS: ALL_CLUSTERS_NOMINAL
        <br />
        &gt; READY_FOR_PATRON_ALLOCATION
      </div>
    </div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
          <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }} />
        </motion.span>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="faq-answer"
        style={{ overflow: 'hidden' }}
      >
        <p style={{ paddingBottom: '1rem' }}>{answer}</p>
      </motion.div>
    </div>
  );
};

const ComputeLeverage: React.FC = () => {
  const [compute, setCompute] = useState(10000);
  const leverageMultiplier = 25;
  const estimatedOutput = compute * leverageMultiplier;

  return (
    <div className="glass" style={{ padding: '3rem', marginTop: '4rem' }}>
      <h3 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Visualize Your Leverage</h3>
      <div className="grid grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            MONTHLY COMPUTE BUDGET: ${compute.toLocaleString()}
          </label>
          <input
            type="range"
            min="5000"
            max="100000"
            step="5000"
            value={compute}
            onChange={(e) => setCompute(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-color)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.875rem', opacity: 0.5 }}>
            <span>$5k</span>
            <span>$100k</span>
          </div>
        </div>
        <div className="grid grid-2" style={{ gap: '1rem' }}>
          <div className="stat-card glass" style={{ padding: '1.5rem' }}>
            <div className="stat-value" style={{ fontSize: '2rem' }}>{leverageMultiplier}x</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Leverage Multiplier</div>
          </div>
          <div className="stat-card glass" style={{ padding: '1.5rem' }}>
            <div className="stat-value" style={{ fontSize: '2rem' }}>${(estimatedOutput / 1000).toFixed(0)}k</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Unlocked Output</div>
          </div>
        </div>
      </div>
      <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', opacity: 0.6 }}>
        *Based on average technical leverage metrics for model-heavy AI startups.
      </p>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const PartnerNote: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="section container">
      <div className="glass" style={{
        padding: '5rem',
        maxWidth: '900px',
        margin: '0 auto',
        borderLeft: '4px solid var(--accent-color)',
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(255,107,0,0.03) 0%, transparent 100%)'
      }}>
        <div style={{
          position: 'absolute',
          top: '2rem',
          right: '3rem',
          opacity: 0.1,
          fontSize: '8rem',
          fontFamily: 'serif',
          lineHeight: 1
        }}>"</div>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-color)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '2rem' }}>{t('partner.header')}</h3>
        <p style={{ fontSize: '1.8rem', lineHeight: '1.5', marginBottom: '2.5rem', fontWeight: 500 }}>
          {t('partner.quote')}<span style={{ color: '#fff' }}>{t('partner.highlight')}</span>{t('partner.quoteEnd')}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700 }}>C</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{t('partner.name')}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>{t('partner.role')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SyndicateComposition: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="section" style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        <div className="grid grid-2" style={{ gap: '6rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>{t('syndicate.title')} <br />{t('syndicate.titleBr')}</h2>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              {t('syndicate.subtitle')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <div style={{ color: 'var(--accent-color)', fontWeight: 700, marginBottom: '0.5rem' }}>{t('syndicate.institutional')}</div>
                <div style={{ fontSize: '0.95rem', opacity: 0.7 }}>{t('syndicate.institutionalDesc')}</div>
              </div>
              <div>
                <div style={{ color: 'var(--accent-color)', fontWeight: 700, marginBottom: '0.5rem' }}>{t('syndicate.compute')}</div>
                <div style={{ fontSize: '0.95rem', opacity: 0.7 }}>{t('syndicate.computeDesc')}</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '1rem', borderRadius: '24px' }}
          >
            <img
              src="/flow_of_alignment.png"
              alt="PatronAIge Flow of Alignment"
              style={{ width: '100%', borderRadius: '16px' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const RiskReversalHUD: React.FC = () => {
  return (
    <section className="section container">
      <div className="grid grid-3" style={{ gap: '2rem' }}>
        {[
          {
            icon: <Lock size={32} />,
            title: "Non-Recourse",
            desc: "If the project doesn't reach scale, you owe nothing. We take the compute risk so you don't have to."
          },
          {
            icon: <ShieldCheck size={32} />,
            title: "No Personal Guarantees",
            desc: "Your personal assets are never on the line. Our partnership is strictly aligned with project success."
          },
          {
            icon: <CheckCircle2 size={32} />,
            title: "Non-Dilutive",
            desc: "We participate in upside revenue or warrants, keeping your core cap-table clean for future rounds."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ translateY: -10 }}
            className="glass"
            style={{
              padding: '3rem',
              textAlign: 'center',
              borderBottom: '3px solid var(--accent-color)',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)'
            }}
          >
            <div style={{ color: 'var(--accent-color)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              {item.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h3>
            <p style={{ fontSize: '1rem', opacity: 0.7, lineHeight: '1.6' }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const PatronageDashboard: React.FC = () => {
  return (
    <section className="section container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="glass"
        style={{ padding: '4rem', overflow: 'hidden' }}
      >
        <div className="grid grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
          <div>
            <div className="ticker" style={{ marginBottom: '1.5rem' }}>
              <div className="ticker-dot" />
              PATRON TERMINAL V1.0
            </div>
            <h2 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Real-Time <br />Technical Alpha</h2>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
              Monitor your compute investments with surgical precision. Our Patronage Dashboard provides deep visibility into inference velocity, model performance, and portfolio alignment.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                "Live inference tracking across portfolio",
                "Automated revenue-share collection HUD",
                "Direct pipeline to high-leverage builders",
                "One-click additional compute deployment"
              ].map((text, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '1.1rem' }}>
                  <TrendingUp size={20} style={{ color: 'var(--accent-color)' }} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              right: '-20px',
              bottom: '-20px',
              background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
              zIndex: 0,
              opacity: 0.3
            }} />
            <TerminalHUD />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const App: React.FC = () => {
  const { t } = useI18n();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [onboardingPath, setOnboardingPath] = useState<'builder' | 'patron' | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!supabase) {
      console.warn('Supabase client not initialized. Falling back to demo mode.');
      setTimeout(() => {
        setIsFormSubmitted(true);
        setIsSubmitting(false);
      }, 1500);
      return;
    }

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            type: onboardingPath,
            name: data.Name || data['Full Name'],
            email: data.Email || data['Email Address'] || 'no-email@provided.com',
            details: data
          }
        ]);

      if (error) throw error;
      setIsFormSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      // Fallback for demo purposes if DB isn't setup yet
      if (err.message?.includes('404') || err.message?.includes('fetch')) {
        setTimeout(() => setIsFormSubmitted(true), 1500);
      } else {
        setSubmissionError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-page marble-bg">
      <div className="orange-glow" style={{ top: '-10%', right: '-10%' }} />
      <div className="orange-glow" style={{ bottom: '20%', left: '-10%' }} />

      {/* Navigation */}
      <nav className="container" style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo />
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div className="ticker" style={{ marginBottom: 0, padding: '0.5rem 1rem' }}>
            <div className="ticker-dot" />
            {t('nav.ticker')}
          </div>
          <LanguageSelector />
          <a href="#apply" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
            {t('nav.joinWhitelist')}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="section container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="ticker" style={{ margin: '0 auto 2.5rem' }}>
            <div className="ticker-dot" />
            {t('hero.ticker')}
          </motion.div>
          <motion.h1
            variants={itemVariants}
            style={{ fontSize: '5.5rem', marginBottom: '2.5rem', maxWidth: '1100px', margin: '0 auto 2.5rem', lineHeight: '1' }}
          >
            {t('hero.title1')} <br />{t('hero.title2')}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            style={{ fontSize: '1.6rem', maxWidth: '850px', margin: '0 auto 4rem', color: 'var(--text-secondary)' }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div variants={itemVariants} className="hero-buttons" style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <a href="#apply" onClick={() => setOnboardingPath('builder')} className="btn btn-primary" style={{ padding: '1.5rem 3rem', fontSize: '1.2rem', minWidth: '280px' }}>
              {t('hero.builder')} <Cpu size={20} style={{ marginLeft: '1rem' }} />
            </a>
            <a href="#apply" onClick={() => setOnboardingPath('patron')} className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)', padding: '1.5rem 3rem', fontSize: '1.2rem', minWidth: '280px' }}>
              {t('hero.patron')} <ShieldCheck size={20} style={{ marginLeft: '1rem' }} />
            </a>
          </motion.div>
        </motion.div>
      </header>

      {/* The Collision Graphic Section */}
      <section className="section container" style={{ padding: '5rem 0' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="glass"
          style={{
            position: 'relative',
            height: '600px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem'
          }}
        >
          <img
            src="/compute_collision.png"
            alt="Compute Collision"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.4
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px' }}>
            <h2 className="section-title" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{t('shift.title')}</h2>
            <p style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 500 }}>
              {t('shift.body')} <span style={{ color: 'var(--accent-color)' }}>{t('shift.highlight')}</span> {t('shift.bodyEnd')}
            </p>
            <div style={{ marginTop: '3rem', fontSize: '1.1rem', opacity: 0.8, background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              {t('shift.note')}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="section" style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-2"
            style={{ alignItems: 'center', gap: '6rem' }}
          >
            <div>
              <motion.h2 variants={itemVariants} className="section-title">{t('problem.title')} <br />{t('problem.titleBr')}</motion.h2>
              <motion.p variants={itemVariants} style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {t('problem.body')}
              </motion.p>
              <motion.div variants={itemVariants} style={{ marginTop: '3rem' }}>
                <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                  {t('problem.note')}
                </p>
              </motion.div>
            </div>
            <motion.div variants={itemVariants}>
              <ComputeLeverage />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Risk Reversal HUD */}
      <RiskReversalHUD />

      {/* Network Composition */}
      <SyndicateComposition />


      {/* Technical Architecture Section */}
      <section className="section" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
            style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '3.5rem' }}
          >
            Built on <span style={{ color: 'var(--accent-color)' }}>Provable</span> Infrastructure
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '24px', overflow: 'hidden' }}
          >
            <img
              src="/architecture.svg"
              alt="Patronaige technical architecture diagram"
              style={{ width: '100%', height: 'auto', borderRadius: '16px' }}
            />
          </motion.div>
          <div className="grid grid-3" style={{ gap: '2rem', marginTop: '3rem', textAlign: 'center' }}>
            {[
              { title: 'TEE Receipts', desc: 'Hardware-signed inference proofs' },
              { title: 'On-Chain Anchor', desc: 'Starknet L2 audit registry' },
              { title: 'ZK Research', desc: 'Long-term trustlessness roadmap' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass"
                style={{ padding: '1.5rem', borderTop: '2px solid var(--accent-color)' }}
              >
                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>{item.title}</h4>
                <p style={{ fontSize: '0.95rem', opacity: 0.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Note */}
      <PartnerNote />


      {/* Solution Section */}
      <section className="section" style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '6rem' }}
          >
            <motion.h2 variants={itemVariants} className="section-title">{t('structures.title')}</motion.h2>
            <motion.p variants={itemVariants} style={{ fontSize: '1.4rem', maxWidth: '800px', margin: '0 auto' }}>
              {t('structures.subtitle')}
            </motion.p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-3"
            style={{ gap: '2.5rem' }}
          >
            {[
              {
                icon: <TrendingUp size={48} />,
                title: t('structures.revShare'),
                desc: t('structures.revShareDesc')
              },
              {
                icon: <Cpu size={48} />,
                title: t('structures.structured'),
                desc: t('structures.structuredDesc')
              },
              {
                icon: <ShieldCheck size={48} />,
                title: t('structures.warrants'),
                desc: t('structures.warrantsDesc')
              }
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="glass" style={{ padding: '3.5rem', borderTop: '3px solid var(--accent-color)' }}>
                <div style={{ color: 'var(--accent-color)', marginBottom: '2rem' }}>{item.icon}</div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.85rem' }}>{item.title}</h3>
                <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="section-title"
            style={{ textAlign: 'center' }}
          >
            {t('how.title')}
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-4"
            style={{ marginTop: '5rem' }}
          >
            {[
              { step: "01", title: t('how.step1'), desc: t('how.step1Desc') },
              { step: "02", title: t('how.step2'), desc: t('how.step2Desc') },
              { step: "03", title: t('how.step3'), desc: t('how.step3Desc') },
              { step: "04", title: t('how.step4'), desc: t('how.step4Desc') }
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '2.5rem' }}>
                <span style={{ color: 'var(--accent-color)', fontWeight: 800, fontSize: '1.5rem', opacity: 0.3 }}>{item.step}</span>
                <h3 style={{ margin: '1.5rem 0', fontSize: '1.75rem' }}>{item.title}</h3>
                <p style={{ fontSize: '1.125rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Selection */}
      <section className="section" style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title" style={{ textAlign: 'center' }}>{t('faq.title')}</h2>
            <div style={{ marginTop: '4rem' }} className="glass">
              <div style={{ padding: '1rem 2rem' }}>
                <FAQItem
                  question={t('faq.q1')}
                  answer={t('faq.a1')}
                />
                <FAQItem
                  question={t('faq.q2')}
                  answer={t('faq.a2')}
                />
                <FAQItem
                  question={t('faq.q3')}
                  answer={t('faq.a3')}
                />
                <FAQItem
                  question={t('faq.q4')}
                  answer={t('faq.a4')}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-2"
          style={{ gap: '8rem' }}
        >
          <div>
            <motion.h2 variants={itemVariants} className="section-title">{t('who.title')}</motion.h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                t('who.item1'),
                t('who.item2'),
                t('who.item3'),
                t('who.item4')
              ].map((text, i) => (
                <motion.li key={i} variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', fontSize: '1.4rem' }}>
                  <CheckCircle2 size={28} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.div variants={itemVariants} className="glass" style={{ padding: '4rem', alignSelf: 'center', borderRight: '4px solid #ef4444' }}>
            <h3 style={{ marginBottom: '2rem', fontSize: '2rem' }}>{t('who.notFor')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.25rem' }}>
              <p style={{ color: '#ef4444' }}>{t('who.not1')}</p>
              <p style={{ color: '#ef4444' }}>{t('who.not2')}</p>
              <p style={{ color: '#ef4444' }}>{t('who.not3')}</p>
            </div>
          </motion.div>
        </motion.div>
        <div style={{
          marginTop: '6rem',
          padding: '2.5rem',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.05), transparent)'
        }}>
          <p style={{ fontWeight: 700, color: '#fff', fontSize: '1.25rem', letterSpacing: '0.05em' }}>
            {t('who.privatePilot')}
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section container">
        <div className="glass" style={{ maxWidth: '1000px', margin: '0 auto', padding: '5rem' }}>
          {!onboardingPath ? (
            <div style={{ textAlign: 'center' }}>
              <h2 className="section-title" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{t('apply.joinTitle')}</h2>
              <p style={{ fontSize: '1.5rem', marginBottom: '4rem', color: 'var(--text-secondary)' }}>{t('apply.joinSubtitle')}</p>

              <div className="grid grid-2" style={{ gap: '2.5rem' }}>
                <motion.div
                  whileHover={{ scale: 1.02, translateY: -5 }}
                  onClick={() => setOnboardingPath('builder')}
                  className="glass"
                  style={{ padding: '4rem', cursor: 'pointer', border: '1px solid var(--border-color)', textAlign: 'left' }}
                >
                  <Cpu size={48} style={{ color: 'var(--accent-color)', marginBottom: '2rem' }} />
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('apply.builderCard')}</h3>
                  <p style={{ fontSize: '1.1rem' }}>{t('apply.builderCardDesc')}</p>
                  <div style={{ marginTop: '2.5rem', color: 'var(--accent-color)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {t('apply.builderCardCta')} <ArrowRight size={20} />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, translateY: -5 }}
                  onClick={() => setOnboardingPath('patron')}
                  className="glass"
                  style={{ padding: '4rem', cursor: 'pointer', border: '1px solid var(--border-color)', textAlign: 'left' }}
                >
                  <ShieldCheck size={48} style={{ color: 'var(--accent-color)', marginBottom: '2rem' }} />
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('apply.patronCard')}</h3>
                  <p style={{ fontSize: '1.1rem' }}>{t('apply.patronCardDesc')}</p>
                  <div style={{ marginTop: '2.5rem', color: 'var(--accent-color)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {t('apply.patronCardCta')} <ArrowRight size={20} />
                  </div>
                </motion.div>
              </div>
            </div>
          ) : !isFormSubmitted ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <button
                onClick={() => setOnboardingPath(null)}
                style={{ background: 'none', border: 'none', color: 'var(--accent-color)', cursor: 'pointer', marginBottom: '2rem', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {t('apply.backToSelection')}
              </button>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {onboardingPath === 'builder' ? t('apply.builderOnboarding') : t('apply.patronInquiry')}
                </h2>
                <p style={{ fontSize: '1.25rem' }}>
                  {onboardingPath === 'builder'
                    ? t('apply.builderFormDesc')
                    : t('apply.patronFormDesc')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-2" style={{ gap: '2rem' }}>
                {onboardingPath === 'builder' ? (
                  <>
                    {[
                      { label: "Name", type: "text", required: true },
                      { label: "Project Name", type: "text", required: true },
                      { label: "One-line description", type: "text", required: true, span: 2 },
                      { label: "Stage", type: "select", options: ["Prototype", "MVP", "Post-revenue", "Scaling"] },
                      { label: "Current revenue", type: "text", placeholder: "$0 / month" },
                      { label: "Monthly compute estimate ($)", type: "number", required: true },
                      { label: "Models used", type: "text", placeholder: "GPT-4o, Claude 3.5, etc." },
                      { label: "What milestone will compute unlock?", type: "textarea", required: true, span: 2 },
                      { label: "What upside are you willing to offer?", type: "text", placeholder: "Rev share, equity, tokens, etc.", required: true, span: 2 },
                      { label: "Timeline to first revenue", type: "text", required: true, span: 2 }
                    ].map((field, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        gridColumn: field.span ? `span ${field.span}` : 'span 1'
                      }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea name={field.label} rows={4} required={field.required} style={{
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border-color)',
                            padding: '1rem',
                            borderRadius: '8px',
                            color: '#fff',
                            resize: 'none',
                            fontSize: '1rem'
                          }} />
                        ) : field.type === 'select' ? (
                          <select name={field.label} style={{
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border-color)',
                            padding: '1rem',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1rem'
                          }}>
                            {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                          </select>
                        ) : (
                          <input name={field.label} type={field.type} required={field.required} placeholder={field.placeholder} style={{
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border-color)',
                            padding: '1rem',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1rem'
                          }} />
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      { label: "Full Name", type: "text", required: true },
                      { label: "Firm / Family Office", type: "text", required: true },
                      { label: "Email Address", type: "email", required: true, span: 2 },
                      { label: "Investment Capacity", type: "select", options: ["$100k - $500k", "$500k - $2M", "$2M - $10M", "$10M+"] },
                      { label: "Investment Focus", type: "text", placeholder: "Infrastructure, Consumer AI, B2B, etc." },
                      { label: "Tell us about your strategy", type: "textarea", required: true, span: 2 },
                      { label: "Preferred upside participation", type: "select", options: ["Revenue Share", "Equity Warrants", "Direct Project Upside", "Blended Model"], span: 2 }
                    ].map((field, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        gridColumn: field.span ? `span ${field.span}` : 'span 1'
                      }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea name={field.label} rows={4} required={field.required} style={{
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border-color)',
                            padding: '1rem',
                            borderRadius: '8px',
                            color: '#fff',
                            resize: 'none',
                            fontSize: '1rem'
                          }} />
                        ) : field.type === 'select' ? (
                          <select name={field.label} style={{
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border-color)',
                            padding: '1rem',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1rem'
                          }}>
                            {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                          </select>
                        ) : (
                          <input name={field.label} type={field.type} required={field.required} placeholder={field.placeholder} style={{
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border-color)',
                            padding: '1rem',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1rem'
                          }} />
                        )}
                      </div>
                    ))}
                  </>
                )}

                {submissionError && (
                  <div style={{ gridColumn: 'span 2', color: '#ef4444', textAlign: 'center', marginBottom: '1rem' }}>
                    {submissionError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ gridColumn: 'span 2', marginTop: '1.5rem', height: '4.5rem', fontSize: '1.25rem', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>{onboardingPath === 'builder' ? t('apply.submitBuilder') : t('apply.submitPatron')} <ArrowRight size={24} style={{ marginLeft: '1rem' }} /></>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: 'center', padding: '5rem 0' }}
            >
              <div style={{ color: 'var(--accent-color)', marginBottom: '2rem' }}>
                <CheckCircle2 size={100} style={{ margin: '0 auto' }} />
              </div>
              <h3 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('success.title')}</h3>
              <p style={{ fontSize: '1.3rem', maxWidth: '650px', margin: '0 auto 3.5rem', color: 'var(--text-secondary)' }}>
                {onboardingPath === 'builder' ? t('success.builderMsg') : t('success.patronMsg')}
              </p>
              <button
                onClick={() => {
                  setIsFormSubmitted(false);
                  setOnboardingPath(null);
                }}
                className="btn"
                style={{ border: '1px solid var(--accent-color)', color: 'var(--accent-color)', padding: '1rem 2.5rem' }}
              >
                {t('success.backHome')}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Patronage Dashboard Section at bottom */}
      <PatronageDashboard />

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '6rem 0', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo style={{ fontSize: '2rem' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '0.5rem' }}>
              {t('footer.tagline')}
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.5 }}>
              {t('footer.copyright')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
