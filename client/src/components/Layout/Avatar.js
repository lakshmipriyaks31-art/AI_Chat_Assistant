import React from 'react';

export default function Avatar({ initials, color, size = 40 }) {
  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    background: color + '22',
    border: `2px solid ${color}55`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: Math.round(size * 0.35),
    color: color,
    flexShrink: 0,
    userSelect: 'none',
  };

  return <div style={style} aria-label={initials}>{initials}</div>;
}
