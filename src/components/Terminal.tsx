import React, { useEffect, useState } from 'react'

const Terminal: React.FC = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const currentLineIdx = displayedLines.length

  const lines = [
    { text: 'PATRON_TERMINAL_v1.0.4' },
    { text: '' },
    { text: 'CONNECTED_NODES: 14' },
    { text: '' },
    { text: 'TOTAL_INFERENCE_STREAM' },
    { text: '1,240,582 TOKENS/S' },
    { text: '' },
    { text: 'AVG_PORTFOLIO_ALIGNMENT' },
    { text: '24.5% +0.4%' },
    { text: '' },
    { text: 'LIVE_UNDERWRITING_FEED' },
    { text: '[TX-4091] NeuralFlow DEPLOYED H100 x 8' },
    { text: '[TX-4092] LlamaScale SCALING A100 x 16' },
    { text: '[TX-4093] VisionPro UNDERWRITING H100 x 4' },
    { text: '' },
    { text: '> SYSTEM_STATUS: ALL_CLUSTERS_NOMINAL' },
    { text: '> READY_FOR_PATRON_ALLOCATION' },
  ]

  useEffect(() => {
    if (currentLineIdx >= lines.length) return
    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, lines[currentLineIdx].text])
    }, 40)
    return () => clearTimeout(timer)
  }, [currentLineIdx])

  return (
    <div className="terminal-window mx-auto max-w-2xl">
      <div className="terminal-header">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="ml-2 text-[10px] text-[#9a9590] font-mono">patron — zsh — 80×24</span>
      </div>
      <div className="terminal-body font-mono text-[#2d2926]">
        {displayedLines.map((line, i) => (
          <p key={i} className="leading-relaxed">
            {line === '' ? '\u00A0' : line}
          </p>
        ))}
        {currentLineIdx < lines.length && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#8b735b]">{'\u25B6'}</span>
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Terminal
