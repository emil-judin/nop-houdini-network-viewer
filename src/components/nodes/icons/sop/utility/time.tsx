import React from 'react';
import { arrowHead, pts } from '../../geoHelpers';
import type { OperatorIconDef } from '../../iconTypes';

const OUTLINE = '#262626';

/** Shared circular gauge dial for Time Blend and Time Shift (center 12,12; outer r 9.2). */
const GaugeDial: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <circle cx="12" cy="12" r="9.2" fill="#89929e" stroke={OUTLINE} strokeWidth="1.1" />
    <circle cx="12" cy="12" r="8.1" fill="none" stroke="#c0c7d1" strokeWidth="0.85" />
    <circle cx="12" cy="12" r="7.2" fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.8" />
    <g stroke="#5a616b" strokeWidth="0.85" strokeLinecap="round">
      <line x1="12" y1="5.3" x2="12" y2="6.6" />
      <line x1="12" y1="17.4" x2="12" y2="18.7" />
      <line x1="5.3" y1="12" x2="6.6" y2="12" />
      <line x1="17.4" y1="12" x2="18.7" y2="12" />
    </g>
    {children}
  </>
);

/**
 * Time operators.
 */
export const TIME_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.timeshift',
    label: 'Time Shift',
    family: 'sop',
    description: 'Circular gauge dial with faded previous hands, dark shifted hands, and a curved red clockwise arrow.',
    types: ['timeshift'],
    icons: ['sop_timeshift'],
    refKey: 'SOP_timeshift',
    render: () => {
      const head = arrowHead([17.8, 11.4], [17.0, 9.4], 2.7, 1.5);
      return (
        <GaugeDial>
          <path
            d="M9.2,6.9 L12,12 L7.4,15.2"
            fill="none"
            stroke="#89929e"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.8,13.8 L12,12 L9.6,16.4"
            fill="none"
            stroke={OUTLINE}
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1.25" fill={OUTLINE} />
          <path
            d="M11.8,6.2 A5.8,5.8 0 0,1 17.3,10.2"
            fill="none"
            stroke="#e03228"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <polygon points={pts(head)} fill="#e03228" stroke={OUTLINE} strokeWidth="0.7" strokeLinejoin="round" />
        </GaugeDial>
      );
    },
  },
  {
    id: 'sop.timeblend',
    label: 'Time Blend',
    family: 'sop',
    description: 'Circular gauge dial with a red sector wedge between two dark hands in the upper-left quadrant.',
    types: ['timeblend'],
    icons: ['sop_timeblend'],
    refKey: 'SOP_timeblend',
    render: () => (
      <GaugeDial>
        <path d="M12,12 L5.6,12 A6.4,6.4 0 0,1 10.34,5.82 Z" fill="#e03228" />
        <path
          d="M5.6,12 L12,12 L10.34,5.82"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.25" fill={OUTLINE} />
      </GaugeDial>
    ),
  },
  {
    id: 'sop.retime',
    label: 'Retime',
    family: 'sop',
    description: 'Golden-yellow stopwatch clock face with tick marks, a top plunger button and a retime hand.',
    types: ['retime'],
    icons: ['sop_retime'],
    refKey: 'SOP_retime',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-rt-clk`} cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#ffd519" />
            <stop offset="100%" stopColor="#c4a000" />
          </radialGradient>
        </defs>
        {/* Top stopwatch plunger and loop */}
        <rect x="10.5" y="1.8" width="3" height="2" rx="0.5" fill="#888a85" stroke="#262626" strokeWidth="0.75" />
        <circle cx="12" cy="13.2" r="9.2" fill={`url(#${uid}-rt-clk)`} stroke="#262626" strokeWidth="1.1" />
        <circle cx="12" cy="13.2" r="7.8" fill="none" stroke="#c4a000" strokeWidth="0.5" />
        {/* Tick marks */}
        <line x1="12" y1="6.2" x2="12" y2="8" stroke="#555753" strokeWidth="0.9" />
        <line x1="12" y1="18.4" x2="12" y2="20.2" stroke="#555753" strokeWidth="0.9" />
        <line x1="5" y1="13.2" x2="6.8" y2="13.2" stroke="#555753" strokeWidth="0.9" />
        <line x1="17.2" y1="13.2" x2="19" y2="13.2" stroke="#555753" strokeWidth="0.9" />
        {/* Clock hand pointing up-right */}
        <line x1="12" y1="13.2" x2="16" y2="9.2" stroke="#262626" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="12" cy="13.2" r="1.4" fill="#262626" />
      </>
    ),
  },
  {
    id: 'sop.channel',
    label: 'Channel',
    family: 'sop',
    description: 'Round dark oscilloscope screen in a grey ring bezel showing a bright green sine wave.',
    types: ['channel', 'chopnet', 'constraintnetwork'],
    icons: ['networks_chop', 'sop_channel', 'sop_constraintnetwork'],
    refKey: 'SOP_channel',
    render: () => (
      <>
        <circle cx="12" cy="12" r="9.2" fill="#c0c7d1" stroke="#262626" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="7.4" fill="#3a3f47" stroke="#262626" strokeWidth="1" />
        <path
          d="M5.5,12 C6.8,6.5 8.5,6.5 9.8,12 C11.1,17.5 12.9,17.5 14.2,12 C15.5,6.5 17.2,6.5 18.5,12"
          fill="none"
          stroke="#52d638"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
];
