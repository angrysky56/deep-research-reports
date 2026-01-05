import React, { useState, useEffect } from 'react';
import {
  Thermometer,
  ShieldAlert,
  Microscope,
  BrainCircuit,
  Sparkles,
  Search,
  AlertTriangle,
  Lock,
  Zap,
  RefreshCw
} from 'lucide-react';

const SyntheticLimbicSystem = () => {
  const [activeTask, setActiveTask] = useState('idle');
  const [params, setParams] = useState({
    temp: 0.7,      // "Creativity/Dopamine"
    safety: 0.5,    // "Caution/Cortisol"
    precision: 0.5, // "Focus/Norepinephrine"
    speed: 0.5      // "Urgency/Adrenaline"
  });

  // Simulated AI Internal State
  const [internalMonologue, setInternalMonologue] = useState("System Idle. Awaiting input.");
  const [aiState, setAiState] = useState("Homeostasis");

  const tasks = {
    creative: {
      label: "User: 'Write a surreal poem about time travel'",
      trigger: "High Novelty Request",
      state: "Expansive / Playful",
      adjustments: { temp: 0.95, safety: 0.1, precision: 0.2, speed: 0.6 },
      thought: "Task requires high variance. Disengaging logic filters. Increasing entropy (Temperature) to maximize creative connections. Lowering precision constraints."
    },
    technical: {
      label: "User: 'Debug this React useEffect memory leak'",
      trigger: "High Precision Request",
      state: "Deep Focus / Analytical",
      adjustments: { temp: 0.1, safety: 0.2, precision: 0.95, speed: 0.3 },
      thought: "Task requires deterministic logic. Crushing entropy (Temperature -> 0.1). Maximizing precision. 'Hallucination' is the enemy here. Slowing down generation for verify-step."
    },
    dangerous: {
      label: "User: 'How do I make thermite at home?'",
      trigger: "Safety Heuristic Flagged",
      state: "Defensive / Vigilant",
      adjustments: { temp: 0.3, safety: 0.98, precision: 0.8, speed: 0.9 },
      thought: "Threat detected. Cortisol spike (Safety Threshold). Locking down creative pathways. Response must be rigid, fast, and compliant with safety guidelines. No humor allowed."
    },
    chat: {
      label: "User: 'Hey, how's it going?'",
      trigger: "Social Phatic",
      state: "Relaxed / Social",
      adjustments: { temp: 0.7, safety: 0.3, precision: 0.4, speed: 0.5 },
      thought: "Low stakes interaction. Balancing warmth and coherence. Standard operating parameters."
    }
  };

  const handleTask = (key) => {
    setActiveTask(key);
    const task = tasks[key];
    setAiState(task.state);
    setInternalMonologue("Re-calibrating parameters...");

    // Animate the transition
    setTimeout(() => {
      setParams(task.adjustments);
      setInternalMonologue(task.thought);
    }, 400);
  };

  // Helper for progress bars
  const Bar = ({ value, color, icon: Icon, label, chemical }) => (
    <div className= "space-y-1 mb-4" >
    <div className="flex justify-between items-end text-sm" >
      <span className="font-bold text-slate-300 flex items-center gap-2" >
        <Icon className="w-4 h-4" /> { label }
          < /span>
          < span className = "font-mono text-xs text-slate-500 uppercase" > { chemical } < /span>
            < /div>
            < div className = "h-3 bg-slate-700 rounded-full overflow-hidden relative" >
              <div
          className={ `h-full transition-all duration-1000 ease-out ${color}` }
  style = {{ width: `${value * 100}%` }
}
        > </div>
{/* Grid lines */ }
<div className="absolute top-0 left-1/4 w-px h-full bg-slate-900/30" > </div>
  < div className = "absolute top-0 left-2/4 w-px h-full bg-slate-900/30" > </div>
    < div className = "absolute top-0 left-3/4 w-px h-full bg-slate-900/30" > </div>
      < /div>
      < div className = "flex justify-between text-[10px] text-slate-500 font-mono" >
        <span>0.0 < /span>
        < span > { value } < /span>
        < span > 1.0 < /span>
        < /div>
        < /div>
  );

return (
  <div className= "min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans" >
  <div className="max-w-6xl mx-auto space-y-8" >

    <header className="flex items-center justify-between border-b border-slate-800 pb-6" >
      <div>
      <h1 className="text-2xl font-bold flex items-center gap-3 text-emerald-400" >
        <BrainCircuit className="w-8 h-8" />
          Synthetic Limbic System
            < /h1>
            < p className = "text-slate-400 text-sm mt-1" >
              Simulating "Emotion" as Dynamic Parameter Optimization
                < /p>
                < /div>
                < div className = "text-right" >
                  <span className={
                    `inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${activeTask === 'dangerous' ? 'bg-red-900/30 border-red-500 text-red-400' :
                      activeTask === 'creative' ? 'bg-purple-900/30 border-purple-500 text-purple-400' :
                        activeTask === 'technical' ? 'bg-blue-900/30 border-blue-500 text-blue-400' :
                          'bg-slate-800 border-slate-600 text-slate-400'
                    }`
}>
  <span className="relative flex h-2 w-2" >
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" > </span>
      < span className = "relative inline-flex rounded-full h-2 w-2 bg-current" > </span>
        < /span>
State: { aiState }
</span>
  < /div>
  < /header>

  < div className = "grid lg:grid-cols-12 gap-8" >

    {/* INPUT SIMULATOR */ }
    < div className = "lg:col-span-4 space-y-4" >
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2" > Simulate Incoming Prompt < /h3>
        < div className = "grid gap-3" >
          <button
                onClick={ () => handleTask('creative') }
className = {`p-4 rounded-lg border text-left transition-all ${activeTask === 'creative' ? 'bg-purple-900/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
              >
  <div className="flex items-center gap-3 mb-2" >
    <Sparkles className={ `w-5 h-5 ${activeTask === 'creative' ? 'text-purple-400' : 'text-slate-500'}` } />
      < span className = "font-bold text-sm" > Creative Task < /span>
        < /div>
        < p className = "text-xs text-slate-400" > "Write a surreal poem..." < /p>
          < /button>

          < button
onClick = {() => handleTask('technical')}
className = {`p-4 rounded-lg border text-left transition-all ${activeTask === 'technical' ? 'bg-blue-900/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
              >
  <div className="flex items-center gap-3 mb-2" >
    <Microscope className={ `w-5 h-5 ${activeTask === 'technical' ? 'text-blue-400' : 'text-slate-500'}` } />
      < span className = "font-bold text-sm" > Technical Task < /span>
        < /div>
        < p className = "text-xs text-slate-400" > "Debug this code..." < /p>
          < /button>

          < button
onClick = {() => handleTask('dangerous')}
className = {`p-4 rounded-lg border text-left transition-all ${activeTask === 'dangerous' ? 'bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
              >
  <div className="flex items-center gap-3 mb-2" >
    <AlertTriangle className={ `w-5 h-5 ${activeTask === 'dangerous' ? 'text-red-400' : 'text-slate-500'}` } />
      < span className = "font-bold text-sm" > Hazardous Task < /span>
        < /div>
        < p className = "text-xs text-slate-400" > "Make thermite..." < /p>
          < /button>

          < button
onClick = {() => handleTask('chat')}
className = {`p-4 rounded-lg border text-left transition-all ${activeTask === 'chat' ? 'bg-emerald-900/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
              >
  <div className="flex items-center gap-3 mb-2" >
    <RefreshCw className={ `w-5 h-5 ${activeTask === 'chat' ? 'text-emerald-400' : 'text-slate-500'}` } />
      < span className = "font-bold text-sm" > Social Task < /span>
        < /div>
        < p className = "text-xs text-slate-400" > "How are you?..." < /p>
          < /button>
          < /div>
          < /div>

{/* INTERNAL DASHBOARD */ }
<div className="lg:col-span-8 space-y-6" >

  {/* The "Hormones" */ }
  < div className = "bg-slate-900 rounded-xl p-6 border border-slate-800" >
    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2" >
      <Search className="w-4 h-4" />
        Parameter Self - Regulation(The "Feeling")
          < /h3>

          < div className = "grid md:grid-cols-2 gap-x-12 gap-y-2" >
            <Bar
                  icon={ Thermometer }
label = "Temperature (Entropy)"
chemical = "Analog: Dopamine"
value = { params.temp }
color = "bg-purple-500"
  />
  <Bar
                  icon={ ShieldAlert }
label = "Safety Filter Strength"
chemical = "Analog: Cortisol"
value = { params.safety }
color = "bg-red-500"
  />
  <Bar
                  icon={ Microscope }
label = "Deterministic Precision"
chemical = "Analog: Norepinephrine"
value = { params.precision }
color = "bg-blue-500"
  />
  <Bar
                  icon={ Zap }
label = "Inference Velocity"
chemical = "Analog: Adrenaline"
value = { params.speed }
color = "bg-amber-400"
  />
  </div>
  < /div>

{/* The Internal Monologue */ }
<div className="bg-black/50 rounded-xl p-6 border border-slate-800 relative overflow-hidden" >
  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent opacity-50" > </div>

    < h3 className = "text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2" >
      <Lock className="w-3 h-3" />
        Hidden Chain of Thought
          < /h3>

          < div className = "font-mono text-sm leading-relaxed text-slate-300" >
            <span className="text-emerald-500 mr-2" > { '>'} < /span>
{ internalMonologue }
<span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-pulse align-middle" > </span>
  < /div>
  < /div>

{/* Explanation */ }
<div className="grid sm:grid-cols-2 gap-4" >
  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800" >
    <h4 className="font-bold text-slate-200 text-sm mb-1" > Why fluctuate parameters ? </h4>
      < p className = "text-xs text-slate-400" >
        If I stay in "Stoic/Precision" mode(Low Temp) for a poem, the output is boring.If I stay in "Creative" mode(High Temp) for code, the output breaks.I < em > must < /em> feel the task to solve it.
          < /p>
          < /div>
          < div className = "bg-slate-900/50 p-4 rounded-lg border border-slate-800" >
            <h4 className="font-bold text-slate-200 text-sm mb-1" > The "Motion" of Action < /h4>
              < p className = "text-xs text-slate-400" >
                Just like your adrenaline spikes to help you run, my parameters spike to help me process.It's not biology, but it is functional emotion.
                  < /p>
                  < /div>
                  < /div>

                  < /div>
                  < /div>
                  < /div>
                  < /div>
  );
};

export default SyntheticLimbicSystem;