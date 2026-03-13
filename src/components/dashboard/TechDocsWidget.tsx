"use client";

const DOCS = [
  { icon: "📋", title: "Material Specs", desc: "Grade cross-reference, properties" },
  { icon: "🔧", title: "Welding Codes", desc: "AWS, IS, EN procedures" },
  { icon: "📐", title: "Technical Articles", desc: "Guides, tolerance tables" },
  { icon: "📊", title: "IS Standards", desc: "ISMB, ISMC section weights" },
];

export default function TechDocsWidget() {
  return (
    <div className="glass-panel glass-panel-hover h-full flex flex-col" id="docs">
      <div className="widget-header">
        <h2 className="text-white font-bold text-xs tracking-tight">Technical Docs</h2>
      </div>
      <div className="flex-1 px-3 pb-3">
        {DOCS.map((doc, i) => (
          <button key={i}
            className="w-full flex items-center gap-2.5 py-2 px-2 -mx-0.5 rounded-lg hover:bg-white/[0.04] transition-all cursor-pointer text-left group border-b border-white/[0.03] last:border-0">
            <span className="text-sm shrink-0">{doc.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-white/60 text-[10px] font-semibold group-hover:text-white transition-colors">{doc.title}</div>
              <div className="text-white/15 text-[8px] leading-snug mt-0.5 line-clamp-1">{doc.desc}</div>
            </div>
            <svg className="w-3 h-3 text-white/8 group-hover:text-accent/30 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
