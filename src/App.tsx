import React, { useEffect } from 'react'

const App: React.FC = () => {
  useEffect(() => {
    document.querySelectorAll('.reveal').forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.08}s`
    })
  }, [])

  return (
    <div className="min-h-screen text-[#2d2926] font-sans selection:bg-amber-200/40 selection:text-[#8b735b]">
      {/* Background layers */}
      <div className="bg-marble" />
      <div className="bg-grain" />
      <div className="marble-vein" />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28">

        {/* Hero */}
        <header className="text-center mb-20 reveal">
          <div className="inline-block mb-4 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#8b735b] border border-[#d4cfc7] rounded-full bg-[#f8f7f4]/60">
            Startup Inference Access
          </div>
          <h1 className="mb-6 text-[#2d2926]">
            Patronaige
          </h1>
          <p className="text-xl md:text-2xl text-[#5a5550] max-w-3xl mx-auto leading-relaxed font-serif">
            Access the AI compute you need{' '}
            <span className="text-[#8b735b] font-serif italic">before</span>{' '}
            you can afford it.
            <br className="hidden md:block" />
            <span className="text-[#6b5d4f] font-serif">Pay with what you build, not what you have.</span>
          </p>
        </header>

        {/* The Problem */}
        <section className="mb-16 reveal">
          <div className="stone-card p-8 md:p-10">
            <h2 className="flex items-center gap-3 mb-5 text-[#2d2926]">
              <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#c9a87c] to-[#8b735b]" />
              Inference Is the New Rent
            </h2>
            <p className="text-lg leading-relaxed text-[#5a5550]">
              AI compute has become the <strong>fixed cost of building</strong>. Labs with deep pockets
              run inference around the clock. Early-stage teams — with the ideas, the talent,
              the momentum — are locked out before they even start. The gap isn't talent.
              It's access.
            </p>
            <p className="text-md leading-relaxed text-[#5a5550] mt-4">
              Patronaige exists to close that gap. We connect compute-hungry startups with
              inference providers who want upside — not just a bill.
            </p>
          </div>
        </section>

        {/* The Model — Two-Sided Marketplace */}
        <section className="mb-16 reveal">
          <h2 className="text-center mb-8 text-[#2d2926]">How Patronaige Works</h2>
          <div className="grid md:grid-cols-2 gap-8">

            {/* For Startups */}
            <div className="stone-card p-6 border-t-4 border-t-[#c9a87c]">
              <h3 className="text-[#8b735b] mb-2 font-serif text-lg">For Startups</h3>
              <p className="text-[#5a5550] text-sm leading-relaxed mb-4">
                You apply. We match you with inference providers who believe
                in what you're building. You get the compute allocation you
                couldn't negotiate on your own.
              </p>
              <ul className="space-y-2">
                {[
                  'No upfront compute costs',
                  'Access inference at scale from day one',
                  'Focus on building — not fundraising for GPU hours',
                  'Global. Pre-seed & seed. Any sector.',
                  'You keep control. You keep building.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#6b5d4f]">
                    <span className="text-[#c9a87c] mt-0.5 shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* For Providers */}
            <div className="stone-card p-6 border-t-4 border-t-[#6b5d4f]">
              <h3 className="text-[#6b5d4f] mb-2 font-serif text-lg">For Inference Providers</h3>
              <p className="text-[#5a5550] text-sm leading-relaxed mb-4">
                You have idle capacity. We surface the best startups that need it.
                You deploy compute against a stake in their success — not a flat
                rental rate.
              </p>
              <ul className="space-y-2">
                {[
                  'Deploy idle GPU capacity into vetted startups',
                  'Earn equity or revenue share when they grow',
                  'TEE-verified usage — proof that compute went to the right work',
                  'Curated pipeline. No outreach needed.',
                  'Patronaige takes a small cut only when the deal succeeds.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#5a5550]">
                    <span className="text-[#c9a87c] mt-0.5 shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mb-16 reveal">
          <h2 className="text-center mb-8 text-[#2d2926]">From Application to Deployment</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Apply', desc: 'Startup submits project, model needs, and roadmap.' },
              { step: '2', title: 'Match', desc: 'We pair you with inference providers that fit your stack.' },
              { step: '3', title: 'Deploy', desc: 'Compute flows. You build. Providers verify usage via TEE.' },
              { step: '4', title: 'Settle', desc: 'When you win, they win. Revenue share or equity, per deal.' },
            ].map((item, i) => (
              <div key={i} className="stone-card p-5 relative">
                <div className="absolute -top-3 left-6 w-6 h-6 rounded-full bg-gradient-to-b from-[#c9a87c] to-[#8b735b] text-[10px] flex items-center justify-center font-bold text-white">
                  {item.step}
                </div>
                <h4 className="text-[#2d2926] font-serif mt-2 mb-1">{item.title}</h4>
                <p className="text-sm text-[#5a5550] font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Layer (TEE — second plane, not hero) */}
        <section className="mb-16 reveal">
          <div className="stone-card p-8 md:p-10">
            <h2 className="flex items-center gap-3 mb-5 text-[#2d2926]">
              <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#c9a87c] to-[#8b735b]" />
              How We Build Trust
            </h2>
            <p className="text-lg leading-relaxed text-[#5a5550] mb-4">
              Inference providers need to know their compute is used for the agreed purpose.
              Startups need to prove it without overhead. Patronaige solves this with{' '}
              <strong>hardware-signed receipts</strong>.
            </p>
            <p className="text-md leading-relaxed text-[#6b5d4f]">
              Every inference run is attested by a TEE enclave (AWS Nitro / Intel SGX)
              and anchored on-chain as a tamper-evident receipt. Providers verify usage.
              Startups stay focused. No paperwork. No disputes.
            </p>
          </div>
        </section>

        {/* The Numbers — Why Inference Costs Matter */}
        <section className="mb-16 reveal">
          <div className="stone-card p-8 gold-glow">
            <h3 className="text-center text-[#8b735b] text-[11px] uppercase tracking-widest mb-6 font-mono">
              What Inference Access Unlocks
            </h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-serif font-semibold text-[#6b5d4f]">$5k–100k+</div>
                <div className="text-sm text-[#9a9590] mt-1">Monthly compute unlocked</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-semibold text-[#8b735b]">Zero</div>
                <div className="text-sm text-[#9a9590] mt-1">Upfront cost for startups</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-semibold text-[#5a5550]">Deal-by-deal</div>
                <div className="text-sm text-[#9a9590] mt-1">Structure. No one-size-fits-all.</div>
              </div>
            </div>
            <p className="text-center text-xs text-[#b8b3ac] mt-6">
              Revenue share, equity, or custom terms — negotiated per match. Patronaige takes a small cut only when both sides win.
            </p>
          </div>
        </section>

        {/* Deal Structures */}
        <section className="mb-16 reveal">
          <h2 className="text-center mb-8 text-[#2d2926]">How Deals Are Structured</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Revenue Share', desc: 'A percentage of revenue until a predefined cap. Cash flows. Simple math.' },
              { title: 'Equity Stake', desc: 'A share of the company in exchange for sustained compute access. Long-term alignment.' },
              { title: 'Hybrid', desc: 'Mix of both. Tailored to the startup\'s stage, capital needs, and growth trajectory.' },
            ].map((card, i) => (
              <div key={i} className="stone-card p-6 text-center">
                <h3 className="text-[#2d2926] mb-2 font-serif">{card.title}</h3>
                <p className="text-[#6b5d4f] text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founder Quote */}
        <section className="mb-16 reveal">
          <div className="stone-card p-8 border-l-4 border-l-[#c9a87c]">
            <blockquote className="text-lg italic text-[#5a5550] mb-4 font-serif">
              "Inference is becoming the electricity of the AI era — essential, expensive, and unequally
              distributed. We're here to change that. Patronaige doesn't fund your company; it{' '}
              <strong className="text-[#8b735b]">unlocks your compute</strong>. If you don't scale,
              we don't get paid. That's the only alignment that matters."
            </blockquote>
            <p className="text-right text-sm text-[#9a9590] font-mono">
              — <strong>Carlos de la Figuera</strong>, Founder
            </p>
          </div>
        </section>

        {/* CTA — Dual channel */}
        <section className="mb-16 reveal">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Startups CTA */}
            <div className="stone-card p-8 text-center border border-[#d4cfc7] hover:border-[#c9a87c] transition-colors">
              <h3 className="text-[#8b735b] font-serif text-lg mb-3">Apply as a Startup</h3>
              <p className="text-[#5a5550] text-sm mb-6">
                Tell us what you're building and what compute you need. We'll match you.
              </p>
              <a
                href="mailto:carlosdelafiguera@gmail.com?subject=Startup%20Application%20—%20Patronaige"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c9a87c] to-[#8b735b] text-white font-medium hover:from-[#d4b48a] hover:to-[#9c8469] transition-all shadow-lg shadow-[#c9a87c]/20"
              >
                Apply Now
              </a>
            </div>

            {/* Providers CTA */}
            <div className="stone-card p-8 text-center border border-[#d4cfc7] hover:border-[#8b735b] transition-colors">
              <h3 className="text-[#6b5d4f] font-serif text-lg mb-3">List Inference Capacity</h3>
              <p className="text-[#5a5550] text-sm mb-6">
                Have idle GPUs? We'll surface vetted startups that need your compute.
              </p>
              <a
                href="mailto:carlosdelafiguera@gmail.com?subject=Provider%20Interest%20—%20Patronaige"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#6b5d4f] to-[#5a5550] text-white font-medium hover:from-[#8b735b] hover:to-[#6b5d4f] transition-all shadow-lg shadow-[#6b5d4f]/20"
              >
                List Capacity
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-[#b8b3ac] mt-6">
            This is an experimental thesis. No pilot program is active yet. We're collecting interest and building the pipeline.
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center text-[#9a9590] text-sm pb-10 font-mono">
          <p>Built on Provable Infrastructure • TEE Receipts • Starknet L2</p>
          <p className="mt-2">Patronaige &copy; {new Date().getFullYear()}</p>
        </footer>

      </main>
    </div>
  )
}

export default App
