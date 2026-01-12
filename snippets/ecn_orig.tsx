import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RefreshCw, Activity, Network, Zap, ChevronDown, Check, TrendingUp, Trophy, Plus, BrainCircuit, HeartPulse, Lock, Hourglass, Dna, Scissors, ZapOff, Gauge, Sliders, Baby, Skull } from 'lucide-react';

// --- Math & Simulation Helpers ---

const MACKEY_GLASS_TAU = 17;

// --- Task Definitions ---
const TASKS = {
  MACKEY_GLASS: {
    id: 'MACKEY_GLASS',
    name: 'Mackey-Glass Chaos',
    type: 'FORECAST',
    description: 'Predicting chaotic fluid dynamics. High difficulty.',
    // Restored: Leak 0.8 is the "Magic Number" you found for tracking chaos
    seedParams: { leak: 0.8, spectral: 0.95, inputScale: 1.0 }, 
    generator: (step, history) => {
      const beta = 0.2;
      const gamma = 0.1;
      const n = 10;
      const xt = history[history.length - 1] || 1.2;
      const xtTau = history[history.length - 1 - MACKEY_GLASS_TAU] || 1.2;
      const delta = beta * xtTau / (1 + Math.pow(xtTau, n)) - gamma * xt;
      return xt + delta;
    }
  },
  SINE_WAVE: {
    id: 'SINE_WAVE',
    name: 'Simple Sine Wave',
    type: 'FORECAST',
    description: 'Basic periodic motion. Low difficulty.',
    seedParams: { leak: 0.9, spectral: 0.7, inputScale: 0.5 },
    generator: (step) => Math.sin(step * 0.1)
  },
  SQUARE_WAVE: {
    id: 'SQUARE_WAVE',
    name: 'Square Switch',
    type: 'FORECAST',
    description: 'Abrupt binary switching. Requires fast adaptation.',
    seedParams: { leak: 0.5, spectral: 0.9, inputScale: 1.0 },
    generator: (step) => Math.sin(step * 0.05) > 0 ? 0.8 : -0.8
  },
  TEMPORAL_MNIST: {
    id: 'TEMPORAL_MNIST',
    name: 'Temporal MNIST (0 vs 1)',
    type: 'CLASSIFY',
    description: 'Classify noisy patterns. Needs Neurogenesis to solve.',
    seedParams: { leak: 0.2, spectral: 0.95, inputScale: 2.0 },
    generator: (step) => {
      const patternIdx = Math.floor(step / 100) % 2;
      const localStep = step % 100;
      const noise = (Math.random() * 0.6) - 0.3; 
      
      if (patternIdx === 0) {
        return { input: Math.sin(localStep * 0.2) + noise, target: -0.8 };
      } else {
        return { input: ((localStep % 10) / 5 - 1) + noise, target: 0.8 };
      }
    }
  }
};

// Global Hyperparameters
const MAX_NEURONS = 512; 
const INITIAL_NEURONS = 8; 
const PRUNE_THRESHOLD = 0.015; 
const LEARNING_RATE = 0.02; 
const DECAY_RATE = 0.001; 

// Adaptation Constants (Restored to User's Agile Settings)
const PATIENCE_LIMIT = 64; // Back to being impatient
const SOLVED_THRESHOLD = 0.01; 
const UNLOCK_THRESHOLD = 0.015; 
const LEARNING_SLOPE_THRESHOLD = -0.0005; 
const LV_GROWTH = 0.02; 
const LV_DECAY = 0.02; 

// Optimizer Constants
const OPT_INTERVAL = 16; // Fast cycle
const OPT_MUTATION_RATE = 0.05; // 5% mutations are noticeable

const EvolutionaryChaosNetwork = () => {
  // --- State ---
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [currentTask, setCurrentTask] = useState(TASKS.MACKEY_GLASS);
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  
  const [metrics, setMetrics] = useState({
    loss: 0,
    avgLoss: 1.0, 
    activeConnections: 0,
    targetConnections: 0,
    regrown: 0,
    prediction: 0,
    target: 0,
    neuronCount: INITIAL_NEURONS,
    patience: 0,
    adaptationStatus: 'STABLE',
    dna: { leak: 0, spectral: 0, inputScale: 0 }
  });

  // --- Refs ---
  const networkRef = useRef({
    activations: new Float32Array(MAX_NEURONS),
    prevActivations: new Float32Array(MAX_NEURONS),
    weights: new Float32Array(MAX_NEURONS * MAX_NEURONS),
    readout: new Float32Array(MAX_NEURONS),
    inputWeights: new Float32Array(MAX_NEURONS),
    
    currentSize: INITIAL_NEURONS,
    totalRegrown: 0,
    currentTargetDensity: 0.2,
    patienceCounter: 0,
    regressionSlope: 0, 
    isLocked: false,
    lossWindow: [],
    
    liveHyperparams: { leak: 0.5, spectral: 0.9, inputScale: 1.0 },
    
    // Optimizer State
    optimizer: {
        timer: 0,
        baselineLoss: 1.0,
        currentLossAcc: 0,
        samples: 0,
        paramKeys: ['leak', 'spectral', 'inputScale'],
        currentIdx: 0,
        state: 'INIT',
        params: {
            leak: { step: 0.05, direction: 0, bestVal: 0.5 },
            spectral: { step: 0.05, direction: 0, bestVal: 0.9 },
            inputScale: { step: 0.1, direction: 0, bestVal: 1.0 }
        },
        lastTestedVal: 0,
        testDirection: 0
    }
  });

  const dataRef = useRef({
    series: [], 
    waveformHistory: [], 
    avgLossBuffer: 0
  });

  const canvasRef = useRef(null);
  const chartCanvasRef = useRef(null);
  const reqRef = useRef(null);
  const stepRef = useRef(0); 

  // --- Initialization ---

  const countConnections = useCallback((net) => {
      let count = 0;
      const size = net.currentSize;
      for(let i=0; i<size; i++) {
          for(let j=0; j<size; j++) {
              if (net.weights[i * MAX_NEURONS + j] !== 0) count++;
          }
      }
      return count;
  }, []);

  const initializeNetwork = useCallback((resetWeights = true) => {
    const net = networkRef.current;
    const startParams = { ...currentTask.seedParams }; // Use the expert seeds
    
    net.activations.fill(0);
    net.prevActivations.fill(0);
    
    if (resetWeights) {
      net.liveHyperparams = startParams;
      net.currentSize = INITIAL_NEURONS; 
      net.currentTargetDensity = 0.2;
      net.patienceCounter = 0;
      net.regressionSlope = 0;
      net.isLocked = false;
      net.lossWindow = [];
      
      net.optimizer = {
          timer: 0,
          baselineLoss: 1.0,
          currentLossAcc: 0,
          samples: 0,
          paramKeys: ['leak', 'spectral', 'inputScale'],
          currentIdx: 0,
          state: 'INIT',
          params: {
            leak: { step: 0.05, direction: 0, bestVal: startParams.leak },
            spectral: { step: 0.05, direction: 0, bestVal: startParams.spectral },
            inputScale: { step: 0.1, direction: 0, bestVal: startParams.inputScale }
          },
          lastTestedVal: 0,
          testDirection: 0
      };
      
      for (let i = 0; i < MAX_NEURONS; i++) {
        net.inputWeights[i] = (Math.random() * 2 - 1) * startParams.inputScale;
        net.readout[i] = 0;
      }

      net.weights.fill(0);
      for (let i = 0; i < INITIAL_NEURONS; i++) {
        for (let j = 0; j < INITIAL_NEURONS; j++) {
          if (Math.random() < 0.2) {
            net.weights[i * MAX_NEURONS + j] = (Math.random() * 2 - 1) * startParams.spectral;
          }
        }
      }
      net.totalRegrown = 0;
      dataRef.current.avgLossBuffer = 1.0;

      setMetrics(m => ({ 
          ...m, 
          activeConnections: countConnections(net), 
          targetConnections: Math.floor(INITIAL_NEURONS * INITIAL_NEURONS * 0.2),
          regrown: 0, 
          avgLoss: 1.0,
          neuronCount: INITIAL_NEURONS,
          patience: 0,
          adaptationStatus: 'STABLE',
          dna: startParams
      }));
    }

    const initialSeries = [];
    let val = 1.2;
    for(let i=0; i<MACKEY_GLASS_TAU + 50; i++) {
      const xt_tau = (i >= MACKEY_GLASS_TAU) ? initialSeries[i - MACKEY_GLASS_TAU] : 1.2;
      const delta = 0.2 * xt_tau / (1 + Math.pow(xt_tau, 10)) - 0.1 * val;
      val += delta;
      initialSeries.push(val);
    }
    dataRef.current.series = initialSeries;
    dataRef.current.waveformHistory = new Array(150).fill({ target: 0, prediction: 0 }); 
    
    if (resetWeights) {
        stepRef.current = 0;
        setStep(0);
    }
  }, [currentTask, countConnections]);

  useEffect(() => {
    initializeNetwork(true);
  }, [initializeNetwork]);

  const changeTask = (task) => {
    setCurrentTask(task);
    setIsTaskMenuOpen(false);
    initializeNetwork(true); 
  };
  
  const performMitosis = () => {
      const net = networkRef.current;
      if (net.currentSize >= MAX_NEURONS) return false;
      
      const newIdx = net.currentSize;
      const newSize = net.currentSize + 1;
      const spectral = net.liveHyperparams.spectral;

      // Connect new neuron
      for (let i = 0; i < newSize; i++) {
          if (Math.random() < net.currentTargetDensity) {
             net.weights[newIdx * MAX_NEURONS + i] = (Math.random() * 2 - 1) * spectral;
          }
          if (Math.random() < net.currentTargetDensity) {
             net.weights[i * MAX_NEURONS + newIdx] = (Math.random() * 2 - 1) * spectral;
          }
      }
      net.currentSize = newSize;
      return true;
  };

  const simStep = () => {
    const net = networkRef.current;
    const data = dataRef.current;
    const currentStep = stepRef.current;
    const N = net.currentSize;
    const dna = net.liveHyperparams;
    
    // 1. Get Target & Input
    let targetVal, inputVal;
    
    if (currentTask.type === 'CLASSIFY') {
        const result = currentTask.generator(currentStep);
        inputVal = result.input;
        targetVal = result.target;
    } else {
        inputVal = data.series[data.series.length - 1]; 
        if (currentTask.id === 'MACKEY_GLASS') {
           targetVal = TASKS.MACKEY_GLASS.generator(currentStep, data.series);
        } else {
           targetVal = currentTask.generator(currentStep);
        }
    }

    data.series.push(targetVal);
    if (data.series.length > 500) data.series.shift();

    // 2. Reservoir Update
    net.prevActivations.set(net.activations);
    const leak = dna.leak;
    
    for (let i = 0; i < N; i++) {
      let sum = 0;
      for (let j = 0; j < N; j++) {
        const w = net.weights[i * MAX_NEURONS + j];
        if (w !== 0) sum += w * net.prevActivations[j];
      }
      sum += net.inputWeights[i] * inputVal * dna.inputScale; 
      const newState = Math.tanh(sum);
      net.activations[i] = (1 - leak) * net.prevActivations[i] + leak * newState;
    }

    // 3. Readout
    let prediction = 0;
    for (let i = 0; i < N; i++) {
      prediction += net.activations[i] * net.readout[i];
    }

    // 4. Learning
    const error = targetVal - prediction;
    for (let i = 0; i < N; i++) {
      net.readout[i] += LEARNING_RATE * error * net.activations[i];
    }
    const absError = Math.abs(error);
    data.avgLossBuffer = data.avgLossBuffer * 0.99 + absError * 0.01; 

    // --- 5. ADAPTATION STATE MACHINE ---
    
    // A. Hyperparameter Optimizer (Restored Aggression)
    const opt = net.optimizer;
    opt.timer++;
    opt.currentLossAcc += absError;
    opt.samples++;

    if (opt.timer >= OPT_INTERVAL) {
        const currentAvg = opt.currentLossAcc / opt.samples;
        
        if (opt.lastParam) {
            if (currentAvg < opt.baselineLoss) {
                opt.baselineLoss = currentAvg;
                // Success: accelerate step
                net.optimizer.params[opt.lastParam].step = Math.min(0.2, net.optimizer.params[opt.lastParam].step * 1.1);
            } else {
                // Fail: revert
                net.liveHyperparams[opt.lastParam] -= opt.lastDelta;
                // Penalize step
                net.optimizer.params[opt.lastParam].step *= 0.5;
            }
        } else {
            opt.baselineLoss = currentAvg;
        }

        const params = ['leak', 'spectral', 'inputScale'];
        const targetParam = params[Math.floor(Math.random() * params.length)];
        const direction = Math.random() > 0.5 ? 1 : -1;
        const delta = direction * (net.liveHyperparams[targetParam] * OPT_MUTATION_RATE);
        
        net.liveHyperparams[targetParam] += delta;
        // Clamp
        if (targetParam === 'leak') net.liveHyperparams.leak = Math.max(0.01, Math.min(1.0, net.liveHyperparams.leak));
        
        opt.lastParam = targetParam;
        opt.lastDelta = delta;
        opt.timer = 0;
        opt.currentLossAcc = 0;
        opt.samples = 0;
    }

    // B. Structural Adaptation (Agile)
    net.lossWindow.push(absError);
    if (net.lossWindow.length > 50) net.lossWindow.shift();
    
    let trendSlope = 0;
    if (net.lossWindow.length >= 50) {
        const start = net.lossWindow.slice(0, 25).reduce((a,b)=>a+b,0);
        const end = net.lossWindow.slice(25).reduce((a,b)=>a+b,0);
        slope = start - end; 
    }
    net.regressionSlope = trendSlope;

    if (!net.isLocked && data.avgLossBuffer < SOLVED_THRESHOLD) {
        net.isLocked = true;
        net.patienceCounter = 0;
    } else if (net.isLocked && data.avgLossBuffer > UNLOCK_THRESHOLD) {
        net.isLocked = false;
    }

    let status = 'STABLE';
    if (net.isLocked) {
        status = 'LOCKED';
    } else {
        // Quick reaction: if improvement is negligible, count patience
        const isImproving = trendSlope < LEARNING_SLOPE_THRESHOLD;
        
        if (isImproving) {
            status = 'LEARNING';
            net.patienceCounter = Math.max(0, net.patienceCounter - 1); // Recover fast
        } else {
            status = 'STAGNANT';
            net.patienceCounter++;
        }

        // L-V Dynamics (Restored High Response)
        const growthPressure = absError * LV_GROWTH;
        const densityChange = growthPressure - (net.currentTargetDensity * LV_DECAY);
        net.currentTargetDensity = Math.max(0.1, Math.min(0.9, net.currentTargetDensity + densityChange));
        
        if (net.patienceCounter > PATIENCE_LIMIT) {
            if (performMitosis()) {
                status = 'GROWING';
                net.patienceCounter = 0; 
            }
        }
    }
    
    const targetConns = Math.floor(N * N * net.currentTargetDensity);

    // C. Structural Plasticity
    let activeCount = 0;
    const currentDecay = net.isLocked ? 0 : DECAY_RATE;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const idx = i * MAX_NEURONS + j;
            if (net.weights[idx] !== 0) {
                if (currentDecay > 0) {
                    if (net.weights[idx] > 0) net.weights[idx] -= currentDecay * Math.abs(net.weights[idx]);
                    else net.weights[idx] += currentDecay * Math.abs(net.weights[idx]);
                }
                if (Math.abs(net.weights[idx]) < PRUNE_THRESHOLD) {
                    net.weights[idx] = 0;
                } else {
                    activeCount++;
                }
            }
        }
    }

    const deficit = targetConns - activeCount;
    if (deficit > 0) {
      status = status === 'GROWING' ? 'GROWING' : (net.isLocked ? 'LOCKED' : 'GROWING_SYNAPSES');
      const connectionsToGrow = Math.ceil(deficit * 0.1) + 1; 
      let newConnections = 0;
      let attempts = 0;
      while (newConnections < connectionsToGrow && attempts < 100) {
        attempts++;
        const i = Math.floor(Math.random() * N);
        const j = Math.floor(Math.random() * N);
        const idx = i * MAX_NEURONS + j;
        if (net.weights[idx] === 0) {
          net.weights[idx] = (Math.random() * 2 - 1) * dna.spectral; 
          newConnections++;
        }
      }
      net.totalRegrown += newConnections;
      activeCount += newConnections;
    }

    data.waveformHistory.push({ target: targetVal, prediction: prediction });
    data.waveformHistory.shift();
    stepRef.current++;

    return {
      loss: absError,
      avgLoss: data.avgLossBuffer,
      activeConnections: activeCount,
      targetConnections: targetConns,
      regrown: net.totalRegrown,
      prediction,
      target: targetVal,
      neuronCount: N,
      patience: net.patienceCounter,
      adaptationStatus: status,
      dna: { ...dna } 
    };
  };

  const drawNetwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const net = networkRef.current;
    const N = net.currentSize;
    
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.4;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.4)'; 
    ctx.fillRect(0, 0, w, h);

    const positions = [];
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2;
      positions.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r
      });
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const weight = net.weights[i * MAX_NEURONS + j];
        if (weight === 0) continue;
        
        const signal = net.prevActivations[j] * weight;
        const absSignal = Math.abs(signal);
        
        if (absSignal > 0.05) {
          ctx.beginPath();
          const opacity = Math.min(absSignal * 2, 0.8);
          ctx.strokeStyle = weight > 0 
            ? `rgba(56, 189, 248, ${opacity})` 
            : `rgba(248, 113, 113, ${opacity})`;
          
          ctx.moveTo(positions[j].x, positions[j].y);
          ctx.lineTo(positions[i].x, positions[i].y);
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < N; i++) {
      const val = net.activations[i];
      const intensity = Math.min(Math.abs(val), 1);
      const pos = positions[i];
      
      const inputW = net.inputWeights[i] * net.liveHyperparams.inputScale;
      if (Math.abs(inputW) > 0.1) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = inputW > 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)';
          ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2 + intensity * 5, 0, Math.PI * 2);
      ctx.fillStyle = val > 0 ? `rgba(56, 189, 248, ${0.4 + intensity})` : `rgba(248, 113, 113, ${0.4 + intensity})`;
      ctx.fill();
    }
  };

  const drawChart = () => {
      const canvas = chartCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      const history = dataRef.current.waveformHistory;

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(0, h/2);
      ctx.lineTo(w, h/2);
      ctx.stroke();

      const mapY = (val) => h/2 - (val * h * 0.25); 

      ctx.beginPath();
      ctx.strokeStyle = '#22d3ee'; 
      ctx.lineWidth = 2;
      for(let i=0; i<history.length; i++) {
          const x = (i / (history.length - 1)) * w;
          const y = mapY(history[i].target);
          if (i===0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#a855f7'; 
      for(let i=0; i<history.length; i++) {
          const x = (i / (history.length - 1)) * w;
          const y = mapY(history[i].prediction);
          if (i===0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
      }
      ctx.stroke();
  }

  const loop = () => {
    if (!isRunning) return;
    let finalStats;
    for(let k=0; k<2; k++) {
      finalStats = simStep();
    }
    setStep(stepRef.current);
    setMetrics(finalStats);
    drawNetwork();
    drawChart();
    reqRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (isRunning) {
      reqRef.current = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(reqRef.current);
    }
    return () => cancelAnimationFrame(reqRef.current);
  }, [isRunning]);

  useEffect(() => {
    drawNetwork();
    drawChart();
  }, [step]); 

  const getRank = (loss) => {
      if (loss > 0.5) return { label: 'Unranked', color: 'text-slate-500' };
      if (loss > 0.2) return { label: 'Novice', color: 'text-slate-400' };
      if (loss > 0.1) return { label: 'Apprentice', color: 'text-cyan-600' };
      if (loss > 0.05) return { label: 'Adept', color: 'text-cyan-400' };
      if (loss > 0.02) return { label: 'Master', color: 'text-purple-400' };
      return { label: 'Grandmaster', color: 'text-yellow-400' };
  }

  const getStatusColor = (s) => {
    switch(s) {
      case 'LOCKED': return 'text-purple-400';
      case 'LEARNING': return 'text-emerald-400';
      case 'STAGNANT': return 'text-orange-400';
      case 'GROWING': return 'text-yellow-400';
      case 'GROWING_SYNAPSES': return 'text-blue-400';
      default: return 'text-slate-400';
    }
  };

  const rank = getRank(metrics.avgLoss);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 shadow-md z-10">
        <div className="flex items-center gap-3">
          <Activity className="text-cyan-400" />
          <div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Evolutionary Chaos Network
            </h1>
            <div className="text-[10px] text-slate-500 font-mono tracking-wide uppercase">
              Liquid State Machine • Automated Adaptation
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          {/* Task Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsTaskMenuOpen(!isTaskMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors text-xs font-medium min-w-[160px] justify-between"
            >
              <span>{currentTask.name}</span>
              <ChevronDown size={14} className={`transition-transform ${isTaskMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isTaskMenuOpen && (
              <div className="absolute top-full mt-2 right-0 w-80 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-20">
                 {Object.values(TASKS).map(task => (
                   <button
                    key={task.id}
                    onClick={() => changeTask(task)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-800 transition-colors border-b border-slate-800 last:border-0 flex items-start gap-3 group"
                   >
                      <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${currentTask.id === task.id ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-600'}`}>
                        {currentTask.id === task.id && <div className="w-2 h-2 rounded-full bg-cyan-500" />}
                      </div>
                      <div>
                         <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">{task.name}</span>
                            {task.type === 'CLASSIFY' && <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 rounded">NEW</span>}
                         </div>
                        <div className="text-xs text-slate-500 leading-tight mt-1">{task.description}</div>
                      </div>
                   </button>
                 ))}
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-700 mx-1"></div>

          <div className="flex flex-col items-end">
            <span className="text-slate-500 text-[10px] uppercase tracking-wider">Time Step</span>
            <span className="font-mono text-sm">{step}</span>
          </div>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all ${
              isRunning 
                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' 
                : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
            }`}
          >
            {isRunning ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Run</>}
          </button>
          
          <button
            title="Reset Network Weights"
            onClick={() => { setIsRunning(false); initializeNetwork(true); }}
            className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left: Visualization */}
        <div className="flex-1 relative flex items-center justify-center p-4 bg-slate-950">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="max-w-full max-h-full rounded-full border border-slate-800/50 shadow-2xl shadow-cyan-900/10"
          />
          
          {/* Legend */}
          <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none">
            <div className="bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 text-xs flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
              Active Path
            </div>
            
            {/* Dynamic Status Indicator */}
            <div className={`bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700/50 text-xs flex items-center gap-2 shadow-lg ${getStatusColor(metrics.adaptationStatus)}`}>
              {metrics.adaptationStatus === 'LOCKED' && <Lock size={12} />}
              {metrics.adaptationStatus === 'LEARNING' && <Activity size={12} />}
              {metrics.adaptationStatus === 'STAGNANT' && <Hourglass size={12} />}
              {metrics.adaptationStatus === 'GROWING' && <Plus size={12} />}
              <span className="font-mono uppercase tracking-wide">{metrics.adaptationStatus.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        {/* Right: Metrics */}
        <div className="w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col gap-6 overflow-y-auto">
          
          {/* Hyperparameter DNA Panel */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 mb-4">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2 flex items-center gap-2">
                  <Dna size={12} className="text-blue-400" /> Evolving Hyperparameters
              </div>
              <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 flex flex-col items-center">
                      <div className="text-[9px] text-slate-500 mb-1">Leak Rate</div>
                      <div className="text-xs font-mono text-emerald-400">{metrics.dna?.leak?.toFixed(2) || '0.00'}</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 flex flex-col items-center">
                      <div className="text-[9px] text-slate-500 mb-1">Spectral</div>
                      <div className="text-xs font-mono text-purple-400">{metrics.dna?.spectral?.toFixed(2) || '0.00'}</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 flex flex-col items-center">
                      <div className="text-[9px] text-slate-500 mb-1">Input Scale</div>
                      <div className="text-xs font-mono text-blue-400">{metrics.dna?.inputScale?.toFixed(2) || '0.00'}</div>
                  </div>
              </div>
          </div>

          {/* Neurogenesis Panel */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                  <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-2">
                          <BrainCircuit size={12} /> Brain Size
                      </div>
                      <div className="text-xl font-mono text-white leading-none">
                          {metrics.neuronCount} <span className="text-sm text-slate-500">/ {MAX_NEURONS}</span>
                      </div>
                  </div>
                  <div className="text-right">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center justify-end gap-1">
                          <Hourglass size={10} /> Growth Pressure
                      </div>
                      <div className={`text-xs font-mono ${metrics.patience > PATIENCE_LIMIT * 0.8 ? 'text-orange-400' : 'text-slate-400'}`}>
                          {Math.floor(metrics.patience)} / {PATIENCE_LIMIT}
                      </div>
                  </div>
              </div>
              
              {/* Patience Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ease-linear ${metrics.adaptationStatus === 'LOCKED' ? 'bg-purple-500' : 'bg-yellow-500'}`}
                    style={{ width: `${Math.min(100, (metrics.patience / PATIENCE_LIMIT) * 100)}%` }}
                  />
              </div>
          </div>

          {/* Rank Badge */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between mb-2">
             <div className="flex items-center gap-3">
               <div className={`p-2 rounded-full bg-slate-900 border border-slate-800 ${rank.color}`}>
                 <Trophy size={20} />
               </div>
               <div>
                 <div className="text-[10px] text-slate-500 uppercase tracking-wider">Competition Status</div>
                 <div className={`font-bold ${rank.color}`}>{rank.label}</div>
               </div>
             </div>
             <div className="text-right">
                <div className="text-[10px] text-slate-500">Avg Loss</div>
                <div className="font-mono text-sm text-slate-300">{metrics.avgLoss?.toFixed(4) || '0.0000'}</div>
             </div>
          </div>

          {/* Real-time Chart */}
          <div className="flex flex-col flex-1 min-h-[200px]">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <TrendingUp size={12} /> Live Forecast
            </h3>
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl relative p-0 overflow-hidden shadow-inner">
               <canvas ref={chartCanvasRef} width={340} height={200} className="w-full h-full" />
               <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
                 <div className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                   <div className="w-2 h-0.5 bg-cyan-400"></div> Target
                 </div>
                 <div className="text-[10px] text-purple-400 font-mono flex items-center gap-1">
                   <div className="w-2 h-0.5 bg-purple-400"></div> Prediction
                 </div>
               </div>
            </div>
          </div>

          {/* Network Health */}
          <div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <Network size={12} /> L-V Dynamics
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px] mb-1">Active Synapses</div>
                <div className="text-xl font-mono text-slate-100">
                  {metrics.activeConnections}
                </div>
                <div className="text-[10px] text-slate-600 mt-1 flex justify-between">
                  <span>Dyn. Target:</span>
                  <span className="text-cyan-500">{metrics.targetConnections}</span>
                </div>
              </div>
              
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 relative overflow-hidden group">
                <div className="text-slate-500 text-[10px] mb-1">Plasticity Events</div>
                <div className="text-xl font-mono text-emerald-400">
                  {metrics.regrown}
                </div>
                <div className="text-[10px] text-emerald-900 mt-1 group-hover:text-emerald-700 transition-colors">
                  Regrowth
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
             <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
               <span>Current Error (MSE)</span>
               <span className={`font-mono ${metrics.loss < 0.01 ? 'text-emerald-400' : 'text-orange-400'}`}>{metrics.loss?.toFixed(5) || '0.00000'}</span>
             </div>
             <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
               <div 
                 className={`h-full transition-all duration-300 ${metrics.loss < 0.01 ? 'bg-emerald-500' : 'bg-orange-500'}`}
                 style={{ width: `${Math.min((metrics.loss || 0) * 1000, 100)}%` }}
               />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EvolutionaryChaosNetwork;