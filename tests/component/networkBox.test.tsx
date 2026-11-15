// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import type { NodeProps } from '@xyflow/react';
import { describe, expect, it } from 'vitest';
import { HoudiniNetBox } from '../../src/components/nodes/HoudiniNetBox';
import type { HoudiniNetworkBoxData } from '../../src/schema/types';

const boxProps = (box: HoudiniNetworkBoxData) => ({ data: { box, widthPx: 250, heightPx: 29 } }) as unknown as NodeProps;

describe('HoudiniNetBox', () => {
  it('NOP-NODE-041: a box without a comment shows no title, never its internal name', () => {
    const box: HoudiniNetworkBoxData = {
      name: '__netbox3',
      comment: '',
      pos: [8, -2.5],
      size: [2.5, 0],
      color: [0.15, 0.15, 0.15],
      minimized: true,
      items: [],
    };
    const { container } = render(<HoudiniNetBox {...boxProps(box)} />);
    expect(container.textContent).toBe('');
    expect(screen.queryByText('__netbox3')).toBeNull();
  });

  it('NOP-CONV-031: a dark box with a comment gets a light title', () => {
    const box: HoudiniNetworkBoxData = {
      name: '__netbox1',
      comment: 'Shapes',
      pos: [0, 0],
      size: [3, 2],
      color: [0.25, 0.35, 0.5],
      minimized: false,
      items: [],
    };
    render(<HoudiniNetBox {...boxProps(box)} />);
    expect(screen.getByText('Shapes').parentElement?.style.color).toBe('rgb(240, 240, 240)');
  });
});
