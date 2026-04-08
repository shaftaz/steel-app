"use client";

import { useState } from "react";

export default function ConsultingSection() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name && form.email && form.message) setSubmitted(true);
  }

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="glass-panel glass-panel-hover overflow-hidden">
      <div className="relative p-5 sm:p-6">
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-accent/[0.04] rounded-full blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative">
          {/* Left — Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Steel Consulting Hub</h3>
                <p className="text-white/25 text-[10px]">Expert guidance for procurement & optimization</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {[
                { icon: "📦", title: "Material Sourcing", desc: "Global supplier network across 50+ cities" },
                { icon: "📊", title: "Cost Optimization", desc: "Reduce procurement costs by 8-15% on average" },
                { icon: "🔬", title: "Grade Selection", desc: "Application-specific material recommendations" },
                { icon: "🚚", title: "Logistics Advisory", desc: "Freight optimization & delivery scheduling" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2.5">
                  <span className="text-sm mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-white/60 text-[10px] font-semibold">{item.title}</div>
                    <div className="text-white/20 text-[9px]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-white/[0.03] rounded-lg border border-white/[0.05]">
              <div className="text-white/20 text-[9px] mb-1">Average response time</div>
              <div className="text-accent text-lg font-bold">&lt; 4 hours</div>
              <div className="text-white/15 text-[9px]">Mon–Sat, 9 AM – 7 PM IST</div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/25 text-[9px] font-medium mb-1 uppercase tracking-wider">Name *</label>
                    <input type="text" placeholder="Your name" value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="glass-input w-full px-2.5 py-2 text-[10px]" required />
                  </div>
                  <div>
                    <label className="block text-white/25 text-[9px] font-medium mb-1 uppercase tracking-wider">Email *</label>
                    <input type="email" placeholder="you@company.com" value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="glass-input w-full px-2.5 py-2 text-[10px]" required />
                  </div>
                  <div>
                    <label className="block text-white/25 text-[9px] font-medium mb-1 uppercase tracking-wider">Company</label>
                    <input type="text" placeholder="Company name" value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      className="glass-input w-full px-2.5 py-2 text-[10px]" />
                  </div>
                  <div>
                    <label className="block text-white/25 text-[9px] font-medium mb-1 uppercase tracking-wider">Phone</label>
                    <input type="tel" placeholder="+91 98xxx xxxxx" value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="glass-input w-full px-2.5 py-2 text-[10px]" />
                  </div>
                </div>
                <div>
                  <label className="block text-white/25 text-[9px] font-medium mb-1 uppercase tracking-wider">How can we help? *</label>
                  <textarea placeholder="Describe your requirement — material type, quantity, delivery location, timeline..." rows={3}
                    value={form.message} onChange={(e) => update("message", e.target.value)}
                    className="glass-input w-full px-2.5 py-2 text-[10px] resize-none" required />
                </div>
                <button type="submit" className="btn-glow w-full sm:w-auto px-8 py-2.5 text-xs">
                  Submit Request →
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="w-12 h-12 rounded-full bg-green-up/10 border border-green-up/20 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-green-up" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-sm mb-1">Request Submitted</h4>
                <p className="text-white/30 text-[10px] max-w-xs">
                  Our steel consulting team will review your inquiry and get back to you within 4 hours during business hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", phone: "", message: "" }); }}
                  className="mt-4 text-accent/60 hover:text-accent text-[10px] font-semibold transition-colors">
                  Submit Another Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
