import React from 'react';
import welcomeBanner from './assets/welcome-banner.jpg';

/** Props for {@link PlaygroundBanner}. */
export interface PlaygroundBannerProps {
  /** `large` for the welcome card (120px high), `small` for the bottom of the Networks pane (108px). */
  size?: 'large' | 'small';
  /** Extra classes for the outer box (for example to hide it on short screens). */
  className?: string;
}

/** Sizes of the strip and of the lockup inside it. */
const SIZES = {
  large: { height: 'h-[120px]', padding: 'px-6', gap: 'gap-3', logo: 52, name: 'text-[40px] leading-[34px]', label: 'mt-1 text-[12px]' },
  small: { height: 'h-[108px]', padding: 'px-4', gap: 'gap-3', logo: 48, name: 'text-[38px] leading-[32px]', label: 'mt-1 text-[11px]' },
} as const;

/**
 * Picture strip with the NOP logo and name over it, like the banner of Houdini's Start Here window.
 * Shown at the top of the welcome card and at the bottom of the Networks pane. Decorative only (the
 * page names NOP elsewhere), so screen readers skip it.
 */
export const PlaygroundBanner: React.FC<PlaygroundBannerProps> = ({ size = 'large', className = '' }) => {
  const s = SIZES[size];
  return (
    <div className={`relative shrink-0 ${s.height} overflow-hidden bg-black ${className}`} aria-hidden="true">
      <img src={welcomeBanner} alt="" width={1024} height={240} className="absolute inset-0 w-full h-full object-cover" />
      {/* Darkens the left part, so the white name stays readable on the bright web */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 75%)' }}
      />
      {/* One lockup: the logo is as tall as the name and its label, like a product name on a splash screen */}
      <div className={`relative flex items-center ${s.gap} h-full ${s.padding}`}>
        <img
          src={`${import.meta.env.BASE_URL}favicon.svg`}
          alt=""
          width={s.logo}
          height={s.logo}
          style={{ width: s.logo, height: s.logo }}
        />
        <div className="flex flex-col">
          <p className={`${s.name} font-bold tracking-tight text-white`}>NOP</p>
          <p className={`${s.label} font-semibold uppercase leading-none tracking-[0.2em] text-[#cfcfcf]`}>Playground</p>
        </div>
      </div>
    </div>
  );
};
