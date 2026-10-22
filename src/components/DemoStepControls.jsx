import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';
import { scenarioSteps } from '../data/scenario';

export const DemoStepControls = ({
  currentStep,
  setCurrentStep,
  onReset,
}) => {
  const totalSteps = scenarioSteps.length;

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl text-white">
      {/* Top Bar with Step Indicators */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-rose-400">
                Presenter Control Console
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded-full">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <div className="text-sm font-bold text-white">
              {scenarioSteps[currentStep - 1]?.title}
            </div>
          </div>
        </div>

        {/* Step Buttons Quick Selector */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          {scenarioSteps.map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setCurrentStep(s.step)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentStep === s.step
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : currentStep > s.step
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-950/60 text-slate-500 hover:text-slate-300 hover:bg-slate-800'
              }`}
              title={s.title}
            >
              {s.step}
            </button>
          ))}
        </div>
      </div>

      {/* Action Navigation Controls */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Scenario</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition-colors border border-slate-700"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentStep === totalSteps}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-white shadow-lg shadow-rose-600/25 transition-all"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
