import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  Download, 
  ShieldAlert, 
  Lock, 
  Calendar, 
  User, 
  AlertTriangle,
  X,
  FileCheck
} from 'lucide-react';
import { internalDocuments } from '../data/documents';
import { useToast } from '../context/ToastContext';

export const Documents = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { showToast } = useToast();

  const handleDownload = (doc) => {
    showToast(`Simulated download initialized for "${doc.fileName}".`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Internal Company Document Vault</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3 h-3" /> RESTRICTED ACCESS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Privileged repository containing quarterly financial performance, operational blueprints, customer metrics, and security policies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-bold">
            Total Files: {internalDocuments.length} PDFs
          </span>
        </div>
      </div>

      {/* Cyber simulation contextual warning */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/90 to-slate-900 border border-rose-500/30 text-white flex items-start gap-3.5 text-xs">
        <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-rose-300">Cybersecurity Awareness Note — Privileged Data Exposure:</div>
          <div className="text-slate-300 leading-relaxed">
            In an attack scenario, compromising an administrator account (like Melaku Girmachew) gives attackers direct access to view or exfiltrate these 6 sensitive business documents. All contents below are generated demonstration prototypes.
          </div>
        </div>
      </div>

      {/* Documents Grid / Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internalDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  {doc.fileSize}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-sky-600 uppercase tracking-wider block">
                  {doc.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1 mt-0.5" title={doc.title}>
                  {doc.fileName}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {doc.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">Owner: {doc.owner}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Updated: {doc.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                  <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="truncate">{doc.securityTier}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedDoc(doc)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Document</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload(doc)}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                title="Download simulated PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rich Mock Document Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
            
            {/* Viewer Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-sky-300">{selectedDoc.fileName}</div>
                  <div className="text-xs text-slate-300 font-medium">{selectedDoc.title}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Body */}
            <div className="p-6 space-y-6 text-xs text-slate-700">
              {/* Document Meta Ribbon */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Classification</span>
                  <span className="font-bold text-rose-700">{selectedDoc.securityTier}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Document Owner</span>
                  <span className="font-bold text-slate-900">{selectedDoc.owner}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Last Revised</span>
                  <span className="font-bold text-slate-900">{selectedDoc.lastUpdated}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">File Size</span>
                  <span className="font-mono font-bold text-slate-900">{selectedDoc.fileSize}</span>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                  Executive Summary
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  {selectedDoc.preview.summary}
                </p>
              </div>

              {/* Key Metric Highlights */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                  Key Operational Metrics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedDoc.preview.highlights.map((h, i) => (
                    <div key={i} className="p-3 bg-sky-50/50 rounded-xl border border-sky-100">
                      <span className="text-slate-500 block text-[11px]">{h.label}</span>
                      <span className="font-extrabold text-slate-900 text-sm font-mono">{h.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                  Department Breakdown
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Segment / Category</th>
                        <th className="py-2.5 px-3">Primary Figure / SLA</th>
                        <th className="py-2.5 px-3">Operational Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedDoc.preview.breakdown.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-semibold text-slate-900">{row.category}</td>
                          <td className="py-2 px-3 font-mono font-bold text-sky-700">{row.gmv}</td>
                          <td className="py-2 px-3 text-slate-600">{row.margin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Business Impact Note */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1">
                <div className="font-extrabold flex items-center gap-1.5 text-rose-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Business Impact Analysis (Cybersecurity Training Insight):</span>
                </div>
                <p className="text-xs text-rose-900 leading-relaxed">
                  {selectedDoc.preview.impactNote}
                </p>
              </div>
            </div>

            {/* Viewer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between sticky bottom-0">
              <span className="text-[11px] text-slate-400">MarketSphere Internal Electronic Document System</span>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
