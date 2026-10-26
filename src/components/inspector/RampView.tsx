import React, { useMemo } from 'react';
import type { HoudiniRampData } from '../../schema/types';
import { evaluateRamp, sortedRampPoints } from './rampModel';

/** Number of samples drawn across the ramp. */
const SAMPLES = 96;

/** `0..1` channel to a CSS 0-255 integer. */
const toByte = (v: number) => Math.round(Math.min(1, Math.max(0, v)) * 255);

/**
 * Read-only display of a Houdini ramp parameter: a float ramp as a filled curve, a color ramp as
 * a gradient bar. Small markers show the ramp's points.
 */
export const RampView: React.FC<{ ramp: HoudiniRampData; disabled?: boolean }> = ({ ramp, disabled }) => {
  const points = useMemo(() => sortedRampPoints(ramp), [ramp]);
  const samples = useMemo(
    () => Array.from({ length: SAMPLES + 1 }, (_, i) => evaluateRamp(points, i / SAMPLES)),
    [points],
  );

  if (ramp.color) {
    const stops = samples
      .map((value, i) => `rgb(${toByte(value[0])} ${toByte(value[1] ?? value[0])} ${toByte(value[2] ?? value[0])}) ${((i / SAMPLES) * 100).toFixed(2)}%`)
      .join(', ');
    return (
      <div className={`w-full ${disabled ? 'opacity-50' : ''}`} role="img" aria-label={`Color ramp with ${points.length} points`}>
        <div className="h-6 rounded-[3px] border border-[#1f1f1f]" style={{ background: `linear-gradient(to right, ${stops})` }} />
        <div className="relative h-2">
          {points.map((p, i) => (
            <span
              key={i}
              className="absolute top-0.5 w-1.5 h-1.5 -translate-x-1/2 rotate-45 bg-[#c8c8c8]"
              style={{ left: `${Math.min(1, Math.max(0, p.key)) * 100}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Float ramp: value range covers 0..1 and any values outside it
  const all = samples.map((v) => v[0]);
  const min = Math.min(0, ...all);
  const max = Math.max(1, ...all);
  const y = (v: number) => 1 - (v - min) / (max - min);
  const line = all.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / SAMPLES).toFixed(4)} ${y(v).toFixed(4)}`).join(' ');

  return (
    <div
      className={`relative w-full h-16 rounded-[3px] border border-[#1f1f1f] bg-[#262626] overflow-hidden ${disabled ? 'opacity-50' : ''}`}
      role="img"
      aria-label={`Float ramp with ${points.length} points`}
    >
      <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <line x1="0" x2="1" y1={y(0)} y2={y(0)} stroke="#3a3a3a" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="0" x2="1" y1={y(1)} y2={y(1)} stroke="#3a3a3a" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d={`${line} L1 ${y(min)} L0 ${y(min)} Z`} fill="#4a4a4a" />
        <path d={line} fill="none" stroke="#d0d0d0" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* Point markers as HTML so they stay round in the stretched SVG */}
      {points.map((p, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0f0f0] border border-[#262626]"
          style={{ left: `${Math.min(1, Math.max(0, p.key)) * 100}%`, top: `${y(p.value[0]) * 100}%` }}
        />
      ))}
    </div>
  );
};
