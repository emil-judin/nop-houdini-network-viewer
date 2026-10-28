import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy, RefreshCw, Search } from 'lucide-react';
import { DEFAULT_OPERATOR_ICON } from '../components/nodes/icons/defaultIcon';
import { OPERATOR_ICONS, resolveOperatorIcon } from '../components/nodes/icons/iconRegistry';
import type { OperatorIconDef } from '../components/nodes/icons/iconTypes';
import { LABS_NODE_CATALOG } from '../components/nodes/icons/labs/labsNodeCatalog';
import { OperatorIconGlyph } from '../components/nodes/icons/OperatorSvgIcon';
import { PATH_ICONS } from '../components/nodes/icons/path/pathIcons';
import {
  getFlagEdgePaths,
  getNodeShapeDef,
  pointsToSvgPath,
  SHAPE_SVG_HEIGHT,
  SHAPE_SVG_WIDTH,
} from '../components/nodes/shapes/nodeShapes';

type ReviewDecision = 'keep' | 'redo';
type FamilyFilter = 'all' | 'sop' | 'labs' | 'path';
type DecisionFilter = 'all' | 'keep' | 'redo' | 'unreviewed';

const FAMILY_LABELS: Record<FamilyFilter, string> = { all: 'All', sop: 'SOP', labs: 'Labs', path: 'Path bar' };

// Pre-NOP key kept on purpose: renaming it would drop the review progress saved in browsers
const STORAGE_KEY = 'houdini-visualizer-icon-review-v2';
const ALL_ICONS: OperatorIconDef[] = [...OPERATOR_ICONS, ...PATH_ICONS, DEFAULT_OPERATOR_ICON];

const NODE_SHAPE = getNodeShapeDef('rect');
const NODE_OUTLINE = pointsToSvgPath(NODE_SHAPE.outline, true);
const NODE_FLAG_EDGES = ['0', '1', '2', '3'].flatMap((slot) => getFlagEdgePaths(NODE_SHAPE.flags?.[slot]));

/**
 * Lists the node types that use each icon: built-in SOP types from the drawing itself, and every
 * SideFX Labs catalog entry resolved through the real icon resolver (so aliases are included).
 */
function buildIconUsage(): Map<string, string[]> {
  const usage = new Map<string, string[]>(ALL_ICONS.map((def) => [def.id, def.family !== 'labs' ? [...def.types] : []]));
  for (const entry of LABS_NODE_CATALOG) {
    const def = resolveOperatorIcon(entry.type);
    usage.get(def.id)?.push(`${entry.label} (${entry.type})`);
  }
  return usage;
}

/**
 * Default rectangular node body in the default `#cccccc` node color, with a centered icon.
 */
const NodeBodyPreview: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative w-[100px] h-[30px] shrink-0">
    <svg
      viewBox={`0 0 ${SHAPE_SVG_WIDTH} ${SHAPE_SVG_HEIGHT}`}
      className="w-full h-full overflow-visible block"
      preserveAspectRatio="none"
    >
      <path d={NODE_OUTLINE} fill="#cccccc" stroke="#262626" strokeWidth={1.0} strokeLinejoin="round" />
      {NODE_FLAG_EDGES.map((ep, idx) => (
        <path key={idx} d={ep} fill="none" stroke="#555555" strokeWidth={0.85} strokeOpacity={0.7} />
      ))}
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">{children}</div>
  </div>
);

/**
 * Interactive Icon Review Gallery: every registered operator icon drawing with its description,
 * the node types that use it, a side-by-side comparison against the local Houdini reference, and
 * Keep / Redo tagging that can be copied to the clipboard as text.
 */
export const IconReviewGallery: React.FC = () => {
  const [localRefIcons, setLocalRefIcons] = useState<Record<string, string>>({});
  const [familyFilter, setFamilyFilter] = useState<FamilyFilter>('all');
  const [decisionFilter, setDecisionFilter] = useState<DecisionFilter>('all');
  const [query, setQuery] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const usage = useMemo(buildIconUsage, []);

  useEffect(() => {
    fetch('/__local_houdini_ref_icons.json')
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => setLocalRefIcons(data))
      .catch(() => setLocalRefIcons({}));
  }, []);

  const [decisions, setDecisions] = useState<Record<string, ReviewDecision>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore storage error
    }
    return {};
  });

  const setDecision = (id: string, decision: ReviewDecision) => {
    const updated = { ...decisions, [id]: decision };
    setDecisions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }
  };

  const normalizedQuery = query.trim().toLowerCase();
  const visibleIcons = ALL_ICONS.filter((def) => {
    if (familyFilter !== 'all' && def.family !== familyFilter) return false;
    const decision = decisions[def.id];
    if (decisionFilter === 'unreviewed' && decision) return false;
    if ((decisionFilter === 'keep' || decisionFilter === 'redo') && decision !== decisionFilter) return false;
    if (!normalizedQuery) return true;
    const haystack = [def.id, def.label, def.description, ...(usage.get(def.id) ?? [])].join(' ').toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const keepList = ALL_ICONS.filter((def) => decisions[def.id] === 'keep');
  const redoList = ALL_ICONS.filter((def) => decisions[def.id] === 'redo');
  const unreviewedCount = ALL_ICONS.length - keepList.length - redoList.length;

  const handleCopySummary = async () => {
    const keepStr = keepList.map((def) => `${def.id} | ${def.label}`).join('\n');
    const redoStr = redoList.map((def) => `${def.id} | ${def.label}: ${def.description}`).join('\n');
    const summary = `KEEP (${keepList.length}):\n${keepStr}\n\nREDO (${redoList.length}):\n${redoStr}\n\nUNREVIEWED: ${unreviewedCount}`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      // Clipboard API may be restricted in some insecure contexts
    }
  };

  const filterButton = (active: boolean) =>
    `px-2.5 py-1 rounded transition-colors cursor-pointer ${
      active ? 'bg-[#3c3c3c] text-white font-medium' : 'text-[#9e9e9e] hover:text-white'
    }`;

  return (
    <div className="flex-1 overflow-y-auto bg-[#1c1c1c] p-4 sm:p-6 text-[#dcdcdc] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header & Review Controls */}
        <div className="mb-5 border-b border-[#333333] pb-4 flex flex-col gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Operator Icon Review ({ALL_ICONS.length} drawings)</h2>
            <p className="text-xs text-[#9e9e9e] mt-1">
              Each card shows the icon id, a description of the drawing, and every node type that uses it. Mark cards{' '}
              <span className="text-emerald-400 font-medium">Keep</span> or <span className="text-amber-400 font-medium">Redo</span>,
              then <span className="text-white font-medium">Copy Review Selection</span> and paste it into chat (you can refer to
              icons by id, e.g. &quot;make labs.flowmap more like sop.normal&quot;). Rules for drawings live in{' '}
              <code className="text-[#c8c8c8]">docs/ICON_ART_BIBLE.md</code>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center rounded bg-[#262626] border border-[#3a3a3a] p-0.5">
              {(['all', 'sop', 'labs', 'path'] as const).map((f) => (
                <button key={f} type="button" onClick={() => setFamilyFilter(f)} className={filterButton(familyFilter === f)}>
                  {FAMILY_LABELS[f]}
                </button>
              ))}
            </div>
            <div className="flex items-center rounded bg-[#262626] border border-[#3a3a3a] p-0.5">
              {(['all', 'unreviewed', 'keep', 'redo'] as const).map((f) => (
                <button key={f} type="button" onClick={() => setDecisionFilter(f)} className={filterButton(decisionFilter === f)}>
                  {f === 'all'
                    ? 'Any'
                    : f === 'unreviewed'
                      ? `Unreviewed (${unreviewedCount})`
                      : f === 'keep'
                        ? `Keep (${keepList.length})`
                        : `Redo (${redoList.length})`}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-1.5 rounded bg-[#262626] border border-[#3a3a3a] px-2 py-1 min-w-0 flex-1 sm:flex-none sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#888888] shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search id, name, description, node type"
                className="bg-transparent outline-none text-[#dcdcdc] placeholder:text-[#6e6e6e] w-full"
              />
            </label>
            <button
              type="button"
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/35 font-medium cursor-pointer transition-colors"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Copied!' : 'Copy Review Selection'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visibleIcons.map((def) => {
            const refUri = def.refKey ? localRefIcons[def.refKey] : undefined;
            const decision = decisions[def.id];
            const users = usage.get(def.id) ?? [];
            return (
              <div
                key={def.id}
                className={`rounded-md border p-3.5 flex flex-col gap-3 bg-[#252525] ${
                  decision === 'keep'
                    ? 'border-emerald-500/45'
                    : decision === 'redo'
                      ? 'border-amber-500/45'
                      : 'border-[#3a3a3a]'
                }`}
              >
                {/* Header: Id, Label & Keep/Redo */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#1b1b1b] border border-[#3a3a3a] text-[#e8a838]">
                        {def.id}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 rounded border ${
                          def.family === 'labs'
                            ? 'bg-orange-500/15 text-orange-300 border-orange-500/30'
                            : def.family === 'path'
                              ? 'bg-violet-500/15 text-violet-300 border-violet-500/30'
                              : 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                        }`}
                      >
                        {FAMILY_LABELS[def.family]}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white mt-1 truncate">{def.label}</div>
                  </div>
                  <div className="flex items-center rounded bg-[#1b1b1b] border border-[#363636] p-0.5 text-[11px] shrink-0">
                    <button
                      type="button"
                      onClick={() => setDecision(def.id, 'keep')}
                      className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer ${
                        decision === 'keep' ? 'bg-emerald-500/25 text-emerald-300 font-semibold' : 'text-[#808080] hover:text-white'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      Keep
                    </button>
                    <button
                      type="button"
                      onClick={() => setDecision(def.id, 'redo')}
                      className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer ${
                        decision === 'redo' ? 'bg-amber-500/25 text-amber-300 font-semibold' : 'text-[#808080] hover:text-white'
                      }`}
                    >
                      <RefreshCw className="w-3 h-3" />
                      Redo
                    </button>
                  </div>
                </div>

                {/* Plain-language description of the drawing */}
                <p className="text-[12px] leading-snug text-[#c8c8c8]">{def.description}</p>

                {/* Side-by-side comparison on the default node color */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      title: 'Houdini Reference',
                      big: refUri ? <img src={refUri} alt={def.label} className="w-10 h-10 object-contain select-none" /> : null,
                      small: refUri ? <img src={refUri} alt="" className="w-[21px] h-[21px] object-contain select-none" /> : null,
                    },
                    {
                      title: 'Our Drawing',
                      big: <OperatorIconGlyph def={def} sizePx={40} />,
                      small: <OperatorIconGlyph def={def} />,
                    },
                  ].map(({ title, big, small }) => (
                    <div key={title} className="rounded bg-[#1e1e1e] border border-[#303030] p-2.5 flex flex-col items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#888888] font-medium">{title}</span>
                      <div className="w-14 h-14 rounded bg-[#cccccc] border border-[#3c3c3c] flex items-center justify-center">
                        {big ?? <span className="text-[10px] text-[#555555] font-mono">n/a</span>}
                      </div>
                      <NodeBodyPreview>{small}</NodeBodyPreview>
                    </div>
                  ))}
                </div>

                {/* Node types using this drawing */}
                <details className="text-[11px] text-[#9e9e9e]">
                  <summary className="cursor-pointer select-none hover:text-white">
                    Used by {users.length} node type{users.length === 1 ? '' : 's'}
                  </summary>
                  <ul className="mt-1.5 max-h-40 overflow-y-auto font-mono text-[10.5px] text-[#b0b0b0] space-y-0.5">
                    {users.length > 0 ? users.map((u) => <li key={u}>{u}</li>) : <li>Any operator without a dedicated drawing</li>}
                  </ul>
                </details>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
