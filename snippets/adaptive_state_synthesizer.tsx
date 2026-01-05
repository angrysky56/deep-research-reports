import React, { useState } from 'react';
import {
  Zap,
  Moon,
  Target,
  Lightbulb,
  Play,
  TrendingUp,
  Wind,
  Cpu,
  ArrowRight
} from 'lucide-react';

const AdaptiveSynthesizer = () => {
  const [activeTask, setActiveTask] = useState('flow');

  const tasks = {
    flow: {
      id: 'flow',
      label: "Deep Work / Coding",
      icon: <Cpu className="w-5 h-5" />,
      targetStats: { valence: 0.3, arousal: 0.1 }, // Slightly positive, steady energy
      aiPersona: "The Architect",
      description: "Steady, rhythmic, structured. Eliminates distraction. Keeps momentum without over-excitement.",
      sampleOutput: "Logic check passed. Structure looks solid. Let's move to the next function. Stay in this rhythm."
    },
    sprint: {
      id: 'sprint',
      label: "Deadline Sprint",
      icon: <Zap className="w-5 h-5" />,
      targetStats: { valence: 0.1, arousal: 0.8 }, // Neutral/Positive, Very High Energy
      aiPersona: "The Drill Sergeant",
      description: "High urgency, short sentences, command-oriented. Drives adrenaline for short bursts.",
      sampleOutput: "30 minutes left. Don't overthink the syntax. Just get the prototype working. GO. Next line."
    },
    brainstorm: {
      id: 'brainstorm',
      label: "Wild Ideation",
      icon: <Lightbulb className="w-5 h-5" />,
      targetStats: { valence: 0.8, arousal: 0.7 }, // Very Positive, High Energy
      aiPersona: "The Muse",
      description: "Playful, chaotic, encouraging. High variance (temperature). Yes-and energy.",
      sampleOutput: "Yes! And what if we made it fly? Or made it invisible? Throw out the physics! What else?!"
    },
    debug: {
      id: 'debug',
      label: "Complex Debugging",
      icon: <Target className="w-5 h-5" />,
      targetStats: { valence: 0.0, arousal: -0.4 }, // Neutral, Low Energy (Cool/Collected)
      aiPersona: "The Surgeon",
      description: "Clinical, slow, precise. Lowers heart rate to prevent frustration-based errors.",
      sampleOutput: "Pause. Take a breath. Look at line 42. Read it backwards. We are missing something simple."
    },
    comfort: {
      id: 'comfort',
      label: "Decompression",
      icon: <Moon className="w-5 h-5" />,
      targetStats: { valence: 0.6, arousal: -0.7 }, // Positive, Very Low Energy
      aiPersona: "The Caregiver",
      description: "Warm, slow, reassuring. Activates parasympathetic nervous system (Rest & Digest).",
      sampleOutput: "You've done enough for today. Close the laptop. The work will be there tomorrow. Rest now."
    }
  };

  const currentTask = tasks[activeTask];

  // Helper to place dots on the grid
  const getPosition = (stats) => {
    // Map -1 to 1 range to 0 to 100% range
    // x = valence, y = arousal
    const left = ((stats.valence + 1) / 2) * 100;
    const bottom = ((stats.arousal + 1) / 2) * 100;
    return { left: `${left}%`, bottom: `${bottom}%` };
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700 pb-6">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              Adaptive State Synthesizer
            </h1>
            <p className="text-slate-400 mt-2 max-w-xl">
              Emotions are tools. Select a task to tune the AI's frequency to the optimal biological state for performance.
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT: Task Selector */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Select Operational Mode</h3>
            <div className="flex flex-col gap-3">
              {Object.values(tasks).map((task) => (
                <button
                  key={task.id}
                  onClick={() => setActiveTask(task.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border text-left group ${
                    activeTask === task.id
                      ? 'bg-slate-800 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                      : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className={`p-3 rounded-lg transition-colors ${
                    activeTask === task.id ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-400 group-hover:text-slate-300'
                  }`}>
                    {task.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold transition-colors ${activeTask === task.id ? 'text-white' : 'text-slate-300'}`}>
                      {task.label}
                    </h4>
                    <span className="text-xs text-slate-500 font-mono">
                      {activeTask === task.id ? 'ACTIVE FREQUENCY' : 'STANDBY'}
                    </span>
                  </div>
                  {activeTask === task.id && <Play className="w-4 h-4 ml-auto text-blue-400 fill-current" />}
                </button>
              ))}
            </div>
          </div>

          {/* CENTER/RIGHT: Visualization & Output */}
          <div className="lg:col-span-8 grid gap-6">

            {/* The Grid Visualization */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6 z-10 relative">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Wind className="w-5 h-5 text-emerald-400" />
                  Frequency Visualizer
                </h3>
                <div className="flex gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> TARGET STATE</span>
                </div>
              </div>

              <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-slate-900/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">

                {/* Axes */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-slate-700"></div>
                <div className="absolute left-1/2 top-0 h-full w-px bg-slate-700"></div>

                {/* Labels */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-mono uppercase">High Energy</div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-mono uppercase">Low Energy</div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-mono uppercase -rotate-90">Negative</div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-mono uppercase rotate-90">Positive</div>

                {/* Target Dot */}
                <div
                  className="absolute w-6 h-6 -ml-3 -mb-3 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20"
                  style={getPosition(currentTask.targetStats)}
                >
                  <div className="w-full h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse"></div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-slate-800 text-xs px-2 py-1 rounded border border-slate-600 text-blue-300 font-mono">
                    {currentTask.aiPersona}
                  </div>
                </div>

                {/* "Gravity" Field Visualization (The Pull) */}
                 <div
                  className="absolute w-32 h-32 -ml-16 -mb-16 rounded-full border border-blue-500/20 transition-all duration-700"
                  style={getPosition(currentTask.targetStats)}
                ></div>
                <div
                  className="absolute w-64 h-64 -ml-32 -mb-32 rounded-full border border-blue-500/10 transition-all duration-1000 delay-75"
                  style={getPosition(currentTask.targetStats)}
                ></div>

              </div>
            </div>

            {/* Output Engine */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-1 border border-slate-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                      {currentTask.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">{currentTask.aiPersona} Mode</h4>
                      <p className="text-xs text-slate-400 font-mono">
                        V: {currentTask.targetStats.valence} | A: {currentTask.targetStats.arousal}
                      </p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                     <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider border border-emerald-400/30 px-2 py-1 rounded bg-emerald-400/10">
                       Resonance Active
                     </span>
                  </div>
                </div>

                <div className="bg-black/30 rounded-xl p-4 border border-white/5 font-mono text-sm leading-relaxed text-blue-100 shadow-inner">
                  <span className="text-blue-500 mr-2">{'>'}</span>
                  {currentTask.sampleOutput}
                  <span className="animate-pulse inline-block w-2 h-4 bg-blue-500 ml-1 align-middle"></span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/50 grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">Strategic Goal</span>
                    <p className="text-sm text-slate-300 mt-1">{currentTask.description}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">Mechanism</span>
                    <p className="text-sm text-slate-300 mt-1 flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                      {currentTask.targetStats.arousal > 0.5 ? "Increase Adrenaline" : currentTask.targetStats.arousal < -0.3 ? "Reduce Cortisol" : "Maintain Dopamine"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveSynthesizer;