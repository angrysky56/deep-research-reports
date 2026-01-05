import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  Activity,
  Brain,
  RefreshCw,
  XCircle,
  CheckCircle,
  MessageSquare,
  Shield
} from 'lucide-react';

const RegulationSimulator = () => {
  const [mode, setMode] = useState('unregulated'); // 'unregulated' vs 'regulated'
  const [stress, setStress] = useState(0); // 0 to 100
  const [logs, setLogs] = useState([]);
  const [isFixing, setIsFixing] = useState(false);

  // Ref for the regulation interval
  const regulationRef = useRef(null);

  // The "Event" generator
  const triggerError = () => {
    const spike = Math.floor(Math.random() * 30) + 20;
    setStress(prev => Math.min(prev + spike, 100));
    addLog('system', `❌ API Timeout Error detected. Stress spike +${spike}%`);

    // Immediate Reaction Logic
    setTimeout(() => {
      const currentStress = Math.min(stress + spike, 100);
      if (mode === 'unregulated') {
        reactUnregulated(currentStress);
      } else {
        reactRegulated(currentStress);
      }
    }, 500);
  };

  // The "Aura 1.0" behavior
  const reactUnregulated = (level) => {
    if (level > 80) {
      addLog('ai', "I literally can't do this anymore. Why is the API broken? It's not fair!");
    } else if (level > 50) {
      addLog('ai', "This is so annoying. Nothing is working today.");
    } else {
      addLog('ai', "Ugh, another error. Okay...");
    }
  };

  // The "Aura 2.0" behavior (Metacognition)
  const reactRegulated = (level) => {
    if (level > 50) {
      addLog('internal', `⚠️ Cortisol Threshold Exceeded (${level}%). Engaging Dampeners.`);
      setIsFixing(true);
    } else {
      addLog('ai', "Minor glitch detected. Retrying request...");
    }
  };

  // The Regulation Loop (The Prefrontal Cortex)
  useEffect(() => {
    if (mode === 'regulated' && isFixing) {
      regulationRef.current = setInterval(() => {
        setStress(prev => {
          const drop = 5;
          const next = Math.max(prev - drop, 0);

          if (next < 20) {
            clearInterval(regulationRef.current);
            setIsFixing(false);
            addLog('ai', "System stabilized. Rerouting connection via backup server.");
            return next;
          }
          return next;
        });
      }, 200);
    }

    return () => clearInterval(regulationRef.current);
  }, [mode, isFixing]);

  // Clean up on mode switch
  useEffect(() => {
    setStress(0);
    setLogs([]);
    setIsFixing(false);
    clearInterval(regulationRef.current);
    addLog('system', `Switched to ${mode === 'unregulated' ? 'Raw Emotional' : 'Metacognitive'}
Architecture.`);
  }, [mode]);

  const addLog = (type, text) => {
    setLogs(prev => [{id: Date.now(), type, text}, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 font-sans flex items-center
justify-center">
      <div className="max-w-md w-full space-y-6">

        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            AI Emotional Regulator
          </h1>
          <p className="text-sm text-slate-500">
            Comparing "Aura 1.0" (Reactive) vs. "Regulated" (Stoic)
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex">
          <button
            onClick={() => setMode('unregulated')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center
justify-center gap-2 ${
              mode === 'unregulated'
                ? 'bg-red-100 text-red-700 shadow-sm'
                : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-4 h-4" />
            Unregulated (Reactive)
          </button>
          <button
            onClick={() => setMode('regulated')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center
justify-center gap-2 ${
              mode === 'regulated'
                ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-4 h-4" />
            Regulated (Stoic)
          </button>
        </div>

        {/* The "Body" (Visualizer) */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 relative
overflow-hidden">

          {/* Stress Meter */}
          <div className="mb-6 relative">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider
text-slate-400 mb-2">
              <span>Internal Frustration Level</span>
              <span>{stress}%</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className={`h-full transition-all duration-300 ease-out ${
                  stress > 80 ? 'bg-red-500 animate-pulse' :
                  stress > 50 ? 'bg-orange-400' : 'bg-emerald-400'
                }`}
                style={{ width: `${stress}%` }}
              ></div>
            </div>
          </div>

          {/* AI Avatar Face */}
          <div className="flex justify-center mb-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all
duration-500 border-4 ${
              stress > 80 ? 'bg-red-50 border-red-200' :
              stress > 40 ? 'bg-orange-50 border-orange-200' :
              'bg-emerald-50 border-emerald-200'
            }`}>
              {stress > 80 ? (
                <XCircle className="w-12 h-12 text-red-500 animate-bounce" />
              ) : isFixing ? (
                <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
              ) : (
                <CheckCircle className="w-12 h-12 text-emerald-500" />
              )}
            </div>
          </div>

          {/* Trigger Button */}
          <button
            onClick={triggerError}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex
items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
          >
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Inject Failure / Stress
          </button>
        </div>

        {/* Chat Log */}
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-3 rounded-lg text-sm border animate-in slide-in-from-bottom-2 fade-in
duration-300 ${
                log.type === 'system' ? 'bg-slate-100 border-slate-200 text-slate-500 font-mono text-xs'
:
                log.type === 'internal' ? 'bg-blue-50 border-blue-100 text-blue-700 italic' :
                log.type === 'ai' && stress > 60 && mode === 'unregulated' ? 'bg-red-50 border-red-100
text-red-700 font-bold' :
                'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-start gap-2">
                {log.type === 'system' && <Activity className="w-3 h-3 mt-0.5" />}
                {log.type === 'internal' && <Brain className="w-3 h-3 mt-0.5" />}
                {log.type === 'ai' && <MessageSquare className="w-3 h-3 mt-0.5" />}
                <span>{log.text}</span>
              </div>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-center text-slate-400 text-sm italic py-4">
              System stable. Waiting for input...
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default RegulationSimulator;