import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { lightPalette } from '../theme/colors';

export interface Slice {
  value: number;
  color: string;
}

const point = (c: number, r: number, a: number): [number, number] => [c + r * Math.cos(a), c + r * Math.sin(a)];

export function PieChart({ data, size = 170, emptyColor, strokeColor = lightPalette.chartStroke }: { data: Slice[]; size?: number; emptyColor: string; strokeColor?: string }) {
  const slices = data.filter((d) => d.value > 0);
  const total = slices.reduce((s, d) => s + d.value, 0);
  const c = size / 2;
  const r = c - 2;

  if (total <= 0) {
    return (
      <Svg width={size} height={size}>
        <Circle cx={c} cy={c} r={r} fill={emptyColor} />
      </Svg>
    );
  }
  if (slices.length === 1) {
    return (
      <Svg width={size} height={size}>
        <Circle cx={c} cy={c} r={r} fill={slices[0].color} />
      </Svg>
    );
  }

  let start = -Math.PI / 2;
  return (
    <Svg width={size} height={size}>
      {slices.map((s, i) => {
        const angle = (s.value / total) * Math.PI * 2;
        const end = start + angle;
        const [x1, y1] = point(c, r, start);
        const [x2, y2] = point(c, r, end);
        const d = `M ${c} ${c} L ${x1} ${y1} A ${r} ${r} 0 ${angle > Math.PI ? 1 : 0} 1 ${x2} ${y2} Z`;
        start = end;
        return <Path key={i} d={d} fill={s.color} stroke={strokeColor} strokeWidth={2} />;
      })}
    </Svg>
  );
}
