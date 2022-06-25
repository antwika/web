import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Logotype = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <svg data-testid='logotype' width="128" height="128">
      <mask id="myMask2">
        <circle cx="64" cy="64" r="64" fill="white" />
      </mask>
      <g mask="url(#myMask2)">
        <circle cx="64" cy="64" r="64" fill="#1e1e2e" />
        <mask id="myMask">
          <circle cx="64" cy="64" r="68" fill="white" />
        </mask>
        
        <circle cx="64" cy="64" r="64" fill={theme.primary[50]} />
        <g mask="url(#myMask)">
          <g transform="translate(-46 46)">
            <g transform="translate(64 64) scale(0.4)">
              <rect x="-64" y="-64" width="128" height="128" fill={theme.primary[0]} transform="rotate(75)" />
            </g>
          </g>
          <g transform="translate(46 -46)">
            <g transform="translate(64 64) scale(0.4)">
              <rect x="-64" y="-64" width="128" height="128" fill={theme.primary[0]} transform="rotate(75)" />
            </g>
          </g>
        </g>
        <circle cx="64" cy="64" r="55" fill={theme.primary[50]} />
        <circle cx="64" cy="64" r="52" fill={theme.primary[0]} />
        <circle cx="64" cy="64" r="27" fill={theme.primary[70]} />
        <circle cx="64" cy="64" r="22" fill={theme.primary[0]} />
      </g>
    </svg>
  );
}

export default Logotype;
