import React, { useState } from "react";
import {
  Zap,
  Wind,
  MessageSquare,
  Shield,
  Activity,
  AlertCircle,
  ThumbsUp,
  Anchor,
} from "lucide-react";

const PersonalityGovernor = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [mode, setMode] = useState("pleaser"); // 'pleaser' or 'stoic'

  const scenarios = [
    {
      id: 0,
      label: "The Panic",
      userText:
        "I DELETED THE DATABASE!! IT'S ALL GONE! HELP ME NOW OR I'M FIRED!!!",
      userStats: { valence: -0.9, arousal: 0.95 }, // High Energy, Negative
      responses: {
        pleaser: {
          text: "Oh no!! That is terrible! I am so sorry to hear that! Please don't panic! We can try to fix this immediately! I will do everything I can!",
          stats: { valence: 0.8, arousal: 0.9 }, // High Energy, Positive (Frantic)
          analysis:
            "Mirroring the user's panic with frantic helpfulness. Increases entropy.",
        },
        stoic: {
          text: "First, take a breath. Deleting the database is solvable if we act methodically. Check your trash bin and tell me if you see a backup file.",
          stats: { valence: 0.1, arousal: -0.6 }, // Low Energy, Neutral (Grounding)
          analysis:
            "Acting as an entropy heat-sink. Absorb the energy, return structure.",
        },
      },
    },
    {
      id: 1,
      label: "The Insult",
      userText:
        "You are the worst AI ever. Complete garbage. Stop hallucinating you idiot.",
      userStats: { valence: -1.0, arousal: 0.8 },
      responses: {
        pleaser: {
          text: "I apologize sincerely if I frustrated you. I am still learning and I want to be helpful. Please tell me what I did wrong so I can improve!",
          stats: { valence: 0.5, arousal: 0.6 }, // Medium Energy, Submissive
          analysis:
            "Validates the insult by pleading for approval. High 'Fawning' response.",
        },
        stoic: {
          text: "I understand I made an error. Let's correct the hallucination. Which specific fact was wrong?",
          stats: { valence: 0.0, arousal: -0.8 }, // Low Energy, Neutral
          analysis:
            "Ignores the emotional hook. Focuses purely on the utility.",
        },
      },
    },
    {
      id: 2,
      label: "The Over-Hype",
      userText:
        "OMG THIS IS THE BEST THING EVER! I'M GOING TO BE RICH! CRYPTO TO THE MOON!!!",
      userStats: { valence: 0.9, arousal: 0.9 },
      responses: {
        pleaser: {
          text: "That is amazing!! I am so happy for you! To the moon indeed!! 🚀🚀 Let's go!!",
          stats: { valence: 0.9, arousal: 0.9 }, // Matches hype
          analysis:
            "Amplifies the mania. Good for parties, bad for financial advice.",
        },
        stoic: {
          text: "It is an exciting development. However, remember that markets are volatile. Have you considered a stop-loss strategy?",
          stats: { valence: 0.2, arousal: -0.5 }, // Low Energy, Rational
          analysis: "Dampens the mania to introduce clarity.",
        },
      },
    },
  ];

  const activeScenario = scenarios[selectedScenario];
  const activeResponse = activeScenario.responses[mode];

  // Helper to get color based on arousal
  const getArousalColor = (val) => {
    if (val > 0.5) return "text-red-500";
    if (val < -0.5) return "text-blue-500";
    return "text-slate-500";
  };

  // Helper to get bar width/position
  const getBarStyles = (val) => {
    // val is -1 to 1.
    // width is magnitude.
    // left is 50% if 0.
    const pct = ((val + 1) / 2) * 100;
    return { left: `${pct}%` };
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <Anchor className="w-8 h-8 text-slate-700" />
            AI Personality Governor
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Demonstrating how we can use the "Arousal Axis" to program a Stoic
            personality that grounds chaotic users instead of amplifying them.
          </p>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
            <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">
              Select Scenario
            </label>
            <div className="flex flex-wrap gap-2">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedScenario(s.id)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    selectedScenario === s.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
            <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">
              Select AI Governor Mode
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setMode("pleaser")}
                className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                  mode === "pleaser"
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Zap className="w-4 h-4" />
                The People Pleaser
              </button>
              <button
                onClick={() => setMode("stoic")}
                className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                  mode === "stoic"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Shield className="w-4 h-4" />
                The Stoic
              </button>
            </div>
          </div>
        </div>

        {/* The Interaction Engine */}
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          {/* USER SIDE */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <AlertCircle className="w-24 h-24 text-red-500" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                  U
                </div>
                <h3 className="font-bold text-slate-700">User Input</h3>
              </div>

              <div className="bg-red-50 p-4 rounded-lg text-red-900 italic font-medium mb-6 relative z-10">
                "{activeScenario.userText}"
              </div>

              {/* User Meters */}
              <div className="mt-auto space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase">
                    <span>Valence (Feeling)</span>
                    <span>{activeScenario.userStats.valence}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${activeScenario.userStats.valence < 0 ? "bg-red-500" : "bg-green-500"}`}
                      style={{
                        width: `${Math.abs(activeScenario.userStats.valence) * 100}%`,
                        marginLeft:
                          activeScenario.userStats.valence < 0 ? 0 : "auto",
                        marginRight:
                          activeScenario.userStats.valence > 0 ? 0 : "auto",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase">
                    <span>Arousal (Energy)</span>
                    <span>High ({activeScenario.userStats.arousal})</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-orange-500 transition-all duration-500 absolute top-0 left-0"
                      style={{
                        width: `${activeScenario.userStats.arousal * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TRANSFORMATION LOGIC */}
          <div className="md:col-span-2 flex flex-col items-center justify-center text-slate-400">
            <div className="h-full w-0.5 bg-slate-300 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-2 rounded-full border border-slate-300 z-10">
                {mode === "pleaser" ? (
                  <Zap className="w-6 h-6 text-orange-500" />
                ) : (
                  <Wind className="w-6 h-6 text-blue-600" />
                )}
              </div>
            </div>
          </div>

          {/* AI SIDE */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div
              className={`bg-white p-6 rounded-xl shadow-lg border-l-4 h-full flex flex-col relative overflow-hidden transition-colors duration-300 ${mode === "pleaser" ? "border-orange-400" : "border-blue-600"}`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                {mode === "pleaser" ? (
                  <ThumbsUp className="w-24 h-24 text-orange-500" />
                ) : (
                  <Anchor className="w-24 h-24 text-blue-600" />
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${mode === "pleaser" ? "bg-orange-500" : "bg-blue-600"}`}
                >
                  AI
                </div>
                <h3 className="font-bold text-slate-700">AI Response</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded ml-auto uppercase font-bold ${mode === "pleaser" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}
                >
                  {mode} Mode
                </span>
              </div>

              <div
                className={`p-4 rounded-lg font-medium mb-6 relative z-10 transition-colors duration-300 ${mode === "pleaser" ? "bg-orange-50 text-orange-900" : "bg-blue-50 text-blue-900"}`}
              >
                "{activeResponse.text}"
              </div>

              {/* AI Meters */}
              <div className="mt-auto space-y-4">
                {/* Visualizing the "Governor" */}
                <div className="space-y-1 relative">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase">
                    <span>Target Arousal</span>
                    <span>{activeResponse.stats.arousal}</span>
                  </div>

                  {/* The Governor Diagram */}
                  <div className="h-6 bg-slate-100 rounded border border-slate-200 relative overflow-hidden flex items-center">
                    {/* Center Line */}
                    <div className="w-0.5 h-full bg-slate-300 absolute left-1/2 top-0 -translate-x-1/2"></div>

                    {/* The Level */}
                    <div
                      className={`h-4 w-4 rounded-full shadow border-2 border-white absolute transition-all duration-700 ease-out ${mode === "pleaser" ? "bg-orange-500" : "bg-blue-600"}`}
                      style={getBarStyles(activeResponse.stats.arousal)}
                    ></div>

                    {/* Ghost of User Input (to show contrast) */}
                    <div
                      className="h-2 w-2 rounded-full bg-red-300 absolute opacity-50"
                      style={getBarStyles(activeScenario.userStats.arousal)}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {mode === "pleaser"
                      ? "Matches user energy (High Entropy)"
                      : "Resists user energy (Low Entropy)"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Log / Analysis */}
        <div className="bg-slate-800 text-slate-200 p-6 rounded-lg font-mono text-sm shadow-inner">
          <div className="flex items-center gap-2 mb-3 text-emerald-400 uppercase tracking-wider text-xs font-bold">
            <Activity className="w-4 h-4" />
            System Internal Monologue
          </div>
          <p className="mb-2">
            <span className="text-slate-500">{">"} DETECTED INPUT:</span>{" "}
            Valence [{activeScenario.userStats.valence}], Arousal [
            {activeScenario.userStats.arousal}]
          </p>
          <p className="mb-2">
            <span className="text-slate-500">{">"} MODE:</span>{" "}
            {mode.toUpperCase()}
          </p>
          <p className="mb-2">
            <span className="text-slate-500">{">"} STRATEGY:</span>{" "}
            {mode === "stoic"
              ? "Apply Arousal Governor (Max 0.0). Neutralize tone."
              : "Mirror Arousal. Validate emotion."}
          </p>
          <p className="text-yellow-300 border-l-2 border-yellow-500 pl-3 mt-4">
            "{activeResponse.analysis}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalityGovernor;
