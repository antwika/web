import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

type Props = {
  size: number,
};

const Logotype: React.FC<Props> = ({ size }) => {
  const { theme } = useContext(ThemeContext);

  const mask1 = `logotype-mask1-${size}`;
  const mask2 = `logotype-mask2-${size}`;
  const a = size * 128/128;
  const b = size * 64/128;
  const c = size * 46/128;
  const d = size * 55/128;
  const e = size * 52/128;
  const f = size * 27/128;
  const g = size * 22/128;

  return (
    <svg data-testid='logotype' width={a} height={a}>
      <mask id={mask2}>
        <circle cx={b} cy={b} r={b} fill="white" />
      </mask>
      <g mask={`url(#${mask2})`}>
        <circle cx={b} cy={b} r={b} fill="#1e1e2e" />
        <mask id={mask1}>
          <circle cx={b} cy={b} r="68" fill="white" />
        </mask>
        
        <circle cx={b} cy={b} r={b} fill={theme.neutral[400]} />
        <g mask={`url(#${mask1})`}>
          <g transform={`translate(-${c} ${c})`}>
            <g transform={`translate(${b} ${b}) scale(0.4)`}>
              <rect x={-b} y={-b} width={a} height={a} fill={theme.neutral[700]} transform="rotate(75)" />
            </g>
          </g>
          <g transform={`translate(${c} -${c})`}>
            <g transform={`translate(${b} ${b}) scale(0.4)`}>
              <rect x={-b} y={-b} width={a} height={a} fill={theme.neutral[700]} transform="rotate(75)" />
            </g>
          </g>
        </g>
        <circle cx={b} cy={b} r={d} fill={theme.neutral[400]} />
        <circle cx={b} cy={b} r={e} fill={theme.neutral[700]} />
        <circle cx={b} cy={b} r={f} fill={theme.neutral[400]} />
        <circle cx={b} cy={b} r={g} fill={theme.neutral[50]} />
      </g>
    </svg>
  );
}

Logotype.defaultProps = {
  size: 1,
}

export default Logotype;
