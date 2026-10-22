import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  Mail, 
  Lock, 
  ArrowRight, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Users, 
  DollarSign, 
  Boxes, 
  ExternalLink,
  ChevronRight,
  Eye,
  Key,
  ShieldCheck,
  Server,
  Layers,
  Sparkles,
  Store
} from 'lucide-react';
import { DemoStepControls } from '../components/DemoStepControls';
import { scenarioSteps } from '../data/scenario';
import { mockPhishingEmail } from '../data/emails';
import { internalDocuments } from '../data/documents';
import { initialProducts } from '../data/products';
import { initialOrders } from '../data/orders';

export const SecurityDemo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStep = parseInt(searchParams.get('step') || '1', 10);
  const [currentStep, setCurrentStep] = useState(
    initialStep >= 1 && initialStep <= 7 ? initialStep : 1
  );

  const [impactModalDoc, setImpactModalDoc] = useState(null);

  // Sync currentStep with query params
  useEffect(() => {
    setSearchParams({ step: currentStep.toString() }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, setSearchParams]);

  const handleReset = () => {
    setCurrentStep(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Presenter Header */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-500/15 text-rose-700 border border-rose-500/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Cybersecurity Awareness Training</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">CODE: OPERATION-MARKETSPHERE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Operation MarketSphere: Attacker Simulation Narrative
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Presenter-guided walkthrough: How OSINT reconnaissance and spear-phishing lead to hypothetical administrator session compromise and internal document exposure.
          </p>
        </div>

        <Link
          to="/"
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-sm"
        >
          <Store className="w-4 h-4 text-sky-600" />
          <span>Exit to Marketplace</span>
        </Link>
      </div>

      {/* Presenter Step Controls (Step indicator, Previous, Next, Reset) */}
      <DemoStepControls
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onReset={handleReset}
      />

      {/* STEP 1: OSINT — Publicly Available Information */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Public Profile View */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Search className="w-4 h-4 text-sky-600" />
                  <span>Public Professional Network Profile (Simulated OSINT Target)</span>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded">
                  Publicly Indexed
                </span>
              </div>

              {/* Profile Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
                  alt="Melaku Girmachew"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-sky-500 shadow-md"
                />
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-slate-900">Melaku Girmachew</h3>
                  <div className="text-sm font-semibold text-sky-700">Senior Marketplace Administrator</div>
                  <div className="text-xs text-slate-500">MarketSphere Operations • Addis Ababa, Ethiopia</div>
                  <div className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded inline-block">
                    Display Email: melakugir12@gmail.com
                  </div>
                </div>
              </div>

              {/* Professional Bio */}
              <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  Professional Bio & Responsibilities
                </span>
                <p className="leading-relaxed">
                  "Senior Marketplace Operations Engineer leading core infrastructure, vendor onboarding, and Telebirr/CBE payment reconciliation pipelines across MarketSphere Ethiopia. Keynote speaker at Addis Ababa Tech Summit 2026."
                </p>
              </div>

              {/* Public Mock Social Post */}
              <div className="p-4 rounded-2xl border border-sky-100 bg-sky-50/40 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-bold text-slate-700">Public Post • 3 days ago</span>
                  <span>Public Visibility: Anyone</span>
                </div>
                <p className="text-slate-800 font-medium">
                  "Proud to announce that MarketSphere has just rolled out our automated merchant settlement system in Addis Ababa! Huge congratulations to our Operations and IT teams for scaling this milestone!"
                </p>
                <div className="text-[11px] text-sky-600 font-semibold">
                  #MarketSphere #FintechEthiopia #MarketplaceOps #TelebirrIntegration
                </div>
              </div>

              {/* Step Action: Proceed to next step */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <span>Advance to Step 2: Phishing Lure</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Attacker Evidence & Intelligence Analysis */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-xs font-extrabold text-rose-400 uppercase tracking-wider pb-3 border-b border-slate-800">
                <ShieldAlert className="w-4 h-4" />
                <span>Evidence Analysis: Attacker Perspective</span>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                  <span className="font-bold text-amber-400 block">1. High-Value Target Identified:</span>
                  <p>
                    Melaku Girmachew holds "Senior Marketplace Administrator" privileges. Gaining his session gives an attacker keys to the entire marketplace backend.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                  <span className="font-bold text-amber-400 block">2. Contact Point Discovered:</span>
                  <p>
                    Public display email <code className="text-sky-300 font-mono">melakugir12@gmail.com</code> was uncovered from conference speaker schedules and public directory listings.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                  <span className="font-bold text-amber-400 block">3. Believable Context Built:</span>
                  <p>
                    Knowing Melaku works directly on "Marketplace Operations" and recent launches allows the attacker to craft a highly authentic pre-text regarding "Administrator Session Verification".
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-1">
                  <span className="font-bold block">Key Workshop Takeaway:</span>
                  <p className="text-[11px] leading-relaxed">
                    Social engineering begins long before the phishing email is sent. Public employee footprints allow attackers to bypass generic spam filters by tailoring personalized lures.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* STEP 2: Phishing Email */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Realistic Email Viewer */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              {/* Email Client Header Bar */}
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between text-xs border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span className="font-bold">Simulated Secure Webmail Client</span>
                </div>
                <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                  Target: melakugir12@gmail.com
                </span>
              </div>

              {/* Email Content Container */}
              <div className="p-6 space-y-6 text-xs text-slate-800">
                {/* Email Metadata */}
                <div className="space-y-2 pb-4 border-b border-slate-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {mockPhishingEmail.subject}
                      </h3>
                      <div className="text-slate-500 mt-1">
                        <strong>From:</strong> {mockPhishingEmail.senderName}{' '}
                        <span className="font-mono text-slate-400 text-[11px]">
                          &lt;{mockPhishingEmail.senderAddress}&gt;
                        </span>
                      </div>
                      <div className="text-slate-500">
                        <strong>To:</strong> {mockPhishingEmail.recipientName}{' '}
                        <span className="font-mono text-slate-400 text-[11px]">
                          &lt;{mockPhishingEmail.recipientEmail}&gt;
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">{mockPhishingEmail.date}</span>
                  </div>
                </div>

                {/* Email Body */}
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 bg-slate-50/60 p-6 rounded-2xl border border-slate-100">
                  <p>Hello Melaku,</p>
                  <p>
                    Our simulated security system has flagged your administrator session for verification. Please review the notification using the link below to avoid service interruption to your Marketplace Operations portal.
                  </p>

                  <div className="py-4 text-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/25 transition-all group active:scale-95"
                    >
                      <span>Review Administrator Session</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <div className="text-[11px] text-slate-400 mt-2 font-mono">
                      (Simulated Link: internal demo transition to Step 3)
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">
                    MarketSphere IT Operations<br />
                    Addis Ababa Regional Operations Hub
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-400">Notice: No external email services are used.</span>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                >
                  Simulate Link Click →
                </button>
              </div>
            </div>

            {/* Right: Presenter Analysis Panel */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase tracking-wider pb-3 border-b border-slate-800">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Presenter-Only Phishing Analysis</span>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-2">
                  <span className="font-bold text-white block">Why this message is convincing:</span>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                    {mockPhishingEmail.analysis.convincingFactors.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <span className="font-bold text-rose-400 block">Identifiable Red Flags:</span>
                  <ul className="space-y-1.5 list-disc list-inside text-rose-200/90">
                    {mockPhishingEmail.analysis.redFlags.map((rf, i) => (
                      <li key={i}>{rf}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 space-y-1 pt-3">
                  <span className="font-bold text-sky-400 block">Presenter Coaching Note:</span>
                  <p className="text-[11px] leading-relaxed">
                    {mockPhishingEmail.analysis.presenterNotes}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* STEP 3: Simulated Login Page */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Deceptive Lookalike Login Screen */}
            <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-rose-400/80 p-8 shadow-2xl relative overflow-hidden space-y-6">
              {/* Subtle Presenter Annotation Banner */}
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-[11px] text-rose-900 flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>DEMONSTRATION ONLY: Mock Phishing Lookalike Page</span>
                </span>
                <span className="font-mono text-slate-500">No data collected</span>
              </div>

              {/* MarketSphere Brand Branding */}
              <div className="text-center space-y-2 pt-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-amber-400 flex items-center justify-center shadow-lg shadow-sky-600/20">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                    <path d="M2 12h20"/>
                    <circle cx="12" cy="12" r="2.5" fill="#f59e0b" stroke="none"/>
                  </svg>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Market<span className="text-sky-600">Sphere</span> Administrator Portal
                </h3>
                <p className="text-xs text-slate-500">
                  Privileged Session Verification & Multi-Factor Confirmation
                </p>
              </div>

              {/* Mock Verification Workflow Form */}
              <div className="space-y-4 max-w-sm mx-auto text-xs">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Administrator Identifier</label>
                  <input
                    type="text"
                    disabled
                    value="melakugir12@gmail.com"
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 font-mono font-semibold cursor-not-allowed"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Prefilled by deceptive phishing parameter</span>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Demonstration Password (Mock)</label>
                  <input
                    type="password"
                    disabled
                    value="••••••••••••••••"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 cursor-not-allowed"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">No actual credentials required or captured</span>
                </div>

                {/* Continue Simulation Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>Continue Simulation →</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Clicking advances the educational narrative without saving any inputs.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Technical Explanation */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-xs font-extrabold text-sky-400 uppercase tracking-wider pb-3 border-b border-slate-800">
                <Key className="w-4 h-4" />
                <span>Anatomy of Credential Harvesting</span>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <p className="leading-relaxed">
                  Real phishing pages mimic corporate identity portals (SSO, Microsoft 365, Google Workspace, internal Okta gates) with pixel-perfect accuracy.
                </p>

                <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
                  <span className="font-bold text-amber-400 block">Adversary-in-the-Middle (AiTM):</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Modern phishing frameworks do not just steal passwords; they proxy live authentication requests to intercept session cookies and bypass legacy SMS or app-based MFA prompts in real time.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1">
                  <span className="font-bold block flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>The Unbreakable Countermeasure:</span>
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    <strong>FIDO2 / WebAuthn Hardware Security Keys (e.g. YubiKey):</strong> Hardware keys bind authentication to the verified origin domain in the browser bar. Even if a user enters their key on a phishing site, the cryptographic response fails because the domain doesn't match!
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* STEP 4: Explain the Simulated Credential Compromise */}
      {currentStep === 4 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Visual Sequence Chain */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-black text-rose-600 uppercase tracking-wider">
                Hypothetical Attack Chain Sequence
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                From Public Intelligence to Administrative Hijack
              </h2>
              <p className="text-xs text-slate-500">
                Every event below illustrates the hypothetical cascade resulting from an unmitigated spear-phishing compromise.
              </p>
            </div>

            {/* Sequence Flow Pills */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">1</div>
                <div className="font-bold text-slate-900 text-xs">Targeted Email</div>
                <p className="text-[11px] text-slate-500">Urgent session notification sent to Melaku's contact point.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">2</div>
                <div className="font-bold text-slate-900 text-xs">Simulated Login</div>
                <p className="text-[11px] text-slate-500">Employee lands on convincing verification portal.</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">3</div>
                <div className="font-bold text-rose-900 text-xs">Hypothetical Exposure</div>
                <p className="text-[11px] text-rose-800">Session token or credentials intercepted by adversary.</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">4</div>
                <div className="font-bold text-purple-900 text-xs">Simulated Admin Session</div>
                <p className="text-[11px] text-purple-800">Privileged access achieved into MarketSphere core.</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Event Timeline (Local Simulation)
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-mono text-slate-400">08:45 AM:</span>
                  <span>Public employee details identified via OSINT search (Role: Senior Marketplace Administrator).</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-mono text-slate-400">09:14 AM:</span>
                  <span>Targeted message prepared and delivered referencing marketplace operations context.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-mono text-slate-400">09:18 AM:</span>
                  <span>Employee clicks link under urgency to verify account status.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-50 text-rose-900 font-semibold border border-rose-200">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-mono text-rose-700">09:20 AM:</span>
                  <span>Hypothetical credentials exposed — session token hijacked by attacker node.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 text-purple-900 font-semibold border border-purple-200">
                  <Key className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="font-mono text-purple-700">09:22 AM:</span>
                  <span>Simulated administrator session initialized on MarketSphere backend.</span>
                </div>
              </div>
            </div>

            {/* Step Action */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setCurrentStep(5)}
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-2"
              >
                <span>Transition to Step 5: Compromised Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Simulated Administrator Access */}
      {currentStep === 5 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Prominent Compromise Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 text-white border-2 border-rose-400 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/30 border border-rose-400 flex items-center justify-center text-rose-300">
                <ShieldAlert className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-rose-300">
                  SIMULATED COMPROMISED SESSION — AWARENESS DEMONSTRATION
                </div>
                <h3 className="text-base font-extrabold text-white">
                  Logged in with Melaku Girmachew's Administrative Privileges
                </h3>
                <p className="text-xs text-rose-200/90">
                  The attacker now possesses active read/write permissions across the entire MarketSphere marketplace.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(6)}
              className="px-5 py-2.5 rounded-xl bg-white text-rose-950 font-black text-xs hover:bg-rose-50 shadow-md shrink-0 flex items-center gap-1.5"
            >
              <span>Explore Business Impact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Exposure Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Marketplace Revenue Reports</h4>
              <p className="text-xs text-slate-500">
                Full access to Q3 GMV metrics (ETB 48.25M), merchant take-rate commissions, and bank settlement ratios.
              </p>
              <Link to="/admin/reports" className="text-xs font-bold text-sky-600 hover:underline inline-flex items-center gap-1">
                View Admin Reports <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Customer PII & Identities</h4>
              <p className="text-xs text-slate-500">
                Exposure of 1,240 customer records, residential addresses across Addis Ababa, and phone numbers.
              </p>
              <Link to="/admin/customers" className="text-xs font-bold text-sky-600 hover:underline inline-flex items-center gap-1">
                View Customer Table <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Internal Company Documents</h4>
              <p className="text-xs text-slate-500">
                Unrestricted view into executive financial reports, employee access policies, and incident response playbooks.
              </p>
              <Link to="/admin/documents" className="text-xs font-bold text-sky-600 hover:underline inline-flex items-center gap-1">
                View Document Vault <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Boxes className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Inventory & Warehouse Data</h4>
              <p className="text-xs text-slate-500">
                Stock counts across central distribution hubs, low-stock vulnerability alerts, and supplier quotas.
              </p>
              <Link to="/admin/inventory" className="text-xs font-bold text-sky-600 hover:underline inline-flex items-center gap-1">
                View Inventory <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Staff Directory & Roles</h4>
              <p className="text-xs text-slate-500">
                Contact information and security clearance tiers for executive leadership and cybersecurity personnel.
              </p>
              <Link to="/admin/employees" className="text-xs font-bold text-sky-600 hover:underline inline-flex items-center gap-1">
                View Employee Directory <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Order Dispatch & Status Manipulation</h4>
              <p className="text-xs text-slate-500">
                Capability to reroute delivery addresses, cancel orders, or mark fraudulent refunds as settled.
              </p>
              <Link to="/admin/orders" className="text-xs font-bold text-sky-600 hover:underline inline-flex items-center gap-1">
                View Live Orders <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* STEP 6: Explore Business Impact */}
      {currentStep === 6 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-black text-rose-600 uppercase tracking-wider">
                Step 6: Business Impact Analysis
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Examining the Consequences of Compromised Assets
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Click any of the four mock company documents below to inspect what an attacker sees, accompanied by a targeted business impact assessment.
              </p>
            </div>

            {/* 4 Interactive Impact Document Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internalDocuments.slice(0, 4).map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-sky-400 bg-slate-50/60 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded font-bold">
                        {doc.fileName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{doc.fileSize}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{doc.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{doc.description}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                    <strong className="block text-rose-700 font-bold mb-1">Business Impact:</strong>
                    {doc.preview.impactNote}
                  </div>

                  <button
                    onClick={() => setImpactModalDoc(doc)}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Exposed Document Details</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Step Action */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setCurrentStep(7)}
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-2"
              >
                <span>Advance to Step 7: Summary & Defensive Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: End of Demonstration */}
      {currentStep === 7 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-black text-rose-400 uppercase tracking-widest">
                DEMONSTRATION CONCLUSION
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight">
                The Complete Attack Chain Summarized
              </h2>
              <p className="text-xs text-slate-400">
                How modern enterprises defend against social engineering, credential compromise, and data leakage.
              </p>
            </div>

            {/* Summary Timeline Chain */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center text-xs font-mono font-bold text-sky-400 overflow-x-auto whitespace-nowrap">
              OSINT → Targeted Phishing → Mock Login → Hypothetical Credential Exposure → Simulated Admin Access → Business Impact
            </div>

            {/* Defensive Countermeasures 4-Pillar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-white text-sm">1. Phishing-Resistant MFA (FIDO2)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Replace vulnerable SMS and mobile push OTPs with hardware security keys (FIDO2 / WebAuthn). Hardware keys cryptographically bind auth requests to the true domain, neutralizing credential harvesting even if the employee clicks a deceptive link.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-white text-sm">2. Continuous Cybersecurity Awareness</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Train staff on personal digital footprint hygiene (OSINT), identifying lookalike sender domains, recognizing artificial urgency, and reporting suspicious emails directly with a one-click SOC button.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-white text-sm">3. Least Privilege & Privileged Access (PAM)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enforce strict separation of duties. Administrators should only possess just-in-time (JIT) elevated rights with time-limited session tokens and mandatory secondary approvals for financial exports.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-white text-sm">4. Zero-Trust Continuous Evaluation</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluate session context continuously: flag anomalous geo-velocity (e.g. login from overseas immediately after local activity), sudden IP reputation shifts, and atypical mass document downloads.
                </p>
              </div>

            </div>

            {/* Final Action Controls */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Demonstration from Step 1</span>
              </button>

              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <Store className="w-4 h-4 text-sky-400" />
                <span>Return to MarketSphere Public Marketplace</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Impact Document Inspection Modal */}
      {impactModalDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">{impactModalDoc.title}</h3>
              <button onClick={() => setImpactModalDoc(null)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div><span className="text-slate-400">File:</span> <strong className="font-mono">{impactModalDoc.fileName}</strong></div>
                <div><span className="text-slate-400">Owner:</span> {impactModalDoc.owner}</div>
                <div><span className="text-slate-400">Classification:</span> <span className="text-rose-700 font-bold">{impactModalDoc.securityTier}</span></div>
              </div>

              <p className="leading-relaxed">{impactModalDoc.preview.summary}</p>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900 font-medium">
                <strong>Potential Business Impact:</strong> {impactModalDoc.preview.impactNote}
              </div>
            </div>

            <button
              onClick={() => setImpactModalDoc(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close Impact Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
