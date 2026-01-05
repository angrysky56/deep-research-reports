import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Heart,
  Brain,
  Info,
  RefreshCcw,
  Globe,
  Map,
  BookOpen
} from 'lucide-react';

const EmotionCompass = () => {
  // Biological State (The Orthogonal Axes)
  // Range: -1.0 to 1.0
  const [valence, setValence] = useState(0);
  const [arousal, setArousal] = useState(0);
  const [showTheory, setShowTheory] = useState(false);

  // Derived state for UI feedback
  const [zone, setZone] = useState('');
  const [description, setDescription] = useState('');
  const [labels, setLabels] = useState([]);
  const [culturalNote, setCulturalNote] = useState('');

  // Calculate the "Diagnosis" based on coordinates
  useEffect(() => {
    analyzeState(valence, arousal);
  }, [valence, arousal]);

  const analyzeState = (v, a) => {
    // Determine Quadrant and Intensity
    const intensity = Math.sqrt(v*v + a*a);
    let currentZone = '';
    let desc = '';
    let emotionLabels = [];
    let culture = '';

    if (intensity < 0.2) {
      currentZone = 'Neutral / Homeostasis';
      desc = 'Your body is in a state of equilibrium. There is little demand on your metabolic resources.';
      emotionLabels = ['Neutral', 'Indifferent', 'Blank'];
      culture = 'In many meditative traditions, this center point is the goal—a state distinct from happiness or sadness.';
    } else if (v > 0 && a > 0) {
      // Top Right: High Energy / Positive
      currentZone = 'High Positive Affect';
      desc = 'Your system is mobilized for approach and engagement. Dopamine and adrenaline are likely active.';
      emotionLabels = ['Excitement', 'Joy', 'Euphoria', 'Anticipation'];
      culture = 'Universal consistency: Most cultures clearly distinguish this from negative states. However, some cultures view high-arousal joy as risky or immature (e.g., "happiness that disrupts harmony").';
    } else if (v < 0 && a > 0) {
      // Top Left: High Energy / Negative
      currentZone = 'High Negative Affect';
      desc = 'Your body is in "Fight or Flight". High mobilization, but perceived threat or discomfort.';
      emotionLabels = ['Anxiety', 'Fear', 'Anger', 'Frustration'];
      culture = 'High variation: The study shows many languages "colexify" (group together) Fear and Anger. Your body is ready to act, but culture dictates whether you label that energy as "attack" (anger) or "escape" (fear).';
    } else if (v < 0 && a < 0) {
      // Bottom Left: Low Energy / Negative
      currentZone = 'Low Negative Affect';
      desc = 'Your body is conserving energy. Withdrawal state. Often associated with healing, loss, or exhaustion.';
      emotionLabels = ['Sadness', 'Depression', 'Boredom', 'Lethargy'];
      culture = 'Cultural nuance: Some languages distinguish "Sadness" (grief) from "Pity" or "Regret" sharply, while others group them. In some contexts, this low-energy state is seen as a necessary time for reflection rather than a pathology.';
    } else if (v > 0 && a < 0) {
      // Bottom Right: Low Energy / Positive
      currentZone = 'Low Positive Affect';
      desc = 'Rest and Digest. Your parasympathetic nervous system is dominant. Safety is felt.';
      emotionLabels = ['Calm', 'Contentment', 'Serenity', 'Relief'];
      culture = 'The "Serenity" sector varies wildly. Western "Happiness" often implies high arousal (excitement), whereas Eastern concepts of well-being often map here (low arousal calm).';
    }

    setZone(currentZone);
    setDescription(desc);
    setLabels(emotionLabels);
    setCulturalNote(culture);
  };

  // Helper to map coordinates to percentage for CSS positioning
  const mapToPercent = (val) => ((val + 1) / 2) * 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
            <Map className="w-8 h-8 text-blue-600" />
            Somatic Emotion Compass
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            A self-diagnostic tool based on the <em>Jackson et al. (2019)</em> study.
            Diagnose your biological state (the orthogonal grid) before applying a cultural label.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* LEFT COLUMN: Controls & Visualization */}
          <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-slate-200">

            <div className="space-y-1">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                Step 1: Locate Your Coordinates
              </h2>
              <p className="text-sm text-slate-500">Adjust the sliders to match your current physical sensation.</p>
            </div>

            {/* Arousal Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-slate-700">Arousal (Energy Level)</label>
                <span className={`text-xs font-bold px-2 py-1 rounded ${arousal > 0 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                  {arousal > 0.1 ? 'High / Active' : arousal < -0.1 ? 'Low / Passive' : 'Neutral'}
                </span>
              </div>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.05"
                value={arousal}
                onChange={(e) => setArousal(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Sleepy / Deactivated</span>
                <span>Alert / Activated</span>
              </div>
            </div>

            {/* Valence Slider */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-slate-700">Valence (Feeling Tone)</label>
                <span className={`text-xs font-bold px-2 py-1 rounded ${valence > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {valence > 0.1 ? 'Pleasant' : valence < -0.1 ? 'Unpleasant' : 'Neutral'}
                </span>
              </div>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.05"
                value={valence}
                onChange={(e) => setValence(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Negative / Unpleasant</span>
                <span>Positive / Pleasant</span>
              </div>
            </div>

            {/* The Orthogonal Grid Visualization */}
            <div className="relative w-full aspect-square bg-slate-50 rounded-lg border-2 border-slate-200 mt-6 overflow-hidden">
              {/* Axes Lines */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-300 -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 h-full w-0.5 bg-slate-300 -translate-x-1/2"></div>

              {/* Labels on Grid */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">High Arousal</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Low Arousal</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest -rotate-90">Negative</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest rotate-90">Positive</span>

              {/* The User Dot */}
              <div
                className="absolute w-6 h-6 bg-indigo-600 rounded-full shadow-xl border-2 border-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out z-10 flex items-center justify-center"
                style={{
                  left: `${mapToPercent(valence)}%`,
                  bottom: `${mapToPercent(arousal)}%`
                }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>

              {/* Quadrant Background Colors (Subtle) */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-1/2 h-1/2 absolute top-0 left-0 bg-red-500"></div>   {/* Anxiety/Anger */}
                <div className="w-1/2 h-1/2 absolute top-0 right-0 bg-yellow-500"></div>{/* Excitement */}
                <div className="w-1/2 h-1/2 absolute bottom-0 left-0 bg-blue-500"></div> {/* Depression */}
                <div className="w-1/2 h-1/2 absolute bottom-0 right-0 bg-green-500"></div>{/* Calm */}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Diagnostic & Education */}
          <div className="space-y-6">

            {/* Diagnosis Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Brain className="w-6 h-6 text-indigo-600" />
                Biological Diagnosis
              </h2>

              <div className="mb-4">
                <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Current State</span>
                <p className="text-2xl font-bold text-indigo-700">{zone}</p>
              </div>

              <div className="mb-6">
                <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Somatic Reality</span>
                <p className="text-slate-700 leading-relaxed mt-1">{description}</p>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Potential Labels</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {labels.map((label, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Cultural Context Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-blue-400" />
                Cultural Lens
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {culturalNote}
              </p>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-xs text-slate-400 italic">
                  "The grid coordinates are biological facts. The words we use to describe them are cultural choices."
                </p>
              </div>
            </div>

            {/* Theory Toggle */}
            <button
              onClick={() => setShowTheory(!showTheory)}
              className="w-full py-3 px-4 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium"
            >
              <BookOpen className="w-4 h-4" />
              {showTheory ? 'Hide Theoretical Background' : 'How does this work?'}
            </button>

            {showTheory && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 space-y-2">
                <p>
                  <strong>Orthogonality:</strong> This tool is based on the idea that emotions are made of two independent (orthogonal) dimensions: Valence (Good/Bad) and Arousal (Active/Passive).
                </p>
                <p>
                  <strong>Why this helps:</strong> Often we feel "bad" and immediately label it "Depression" (a cultural label). But if you check your arousal and find it's high, you might actually be experiencing "Agitation" or "Stress" (a different biological state). Accurate diagnosis leads to better regulation.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionCompass;