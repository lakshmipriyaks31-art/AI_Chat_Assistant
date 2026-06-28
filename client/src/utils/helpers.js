const COLORS = [
  '#6366f1', '#0ea5e9', '#10b981', '#f59e0b',
  '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6',
];

export function getInitials(name = '') {
  return name
    .trim()
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now - d;
  if (diff < 86400000) return formatTime(d);
  if (diff < 172800000) return 'Yesterday';
  return d.toLocaleDateString([], { weekday: 'short' });
}


export const shortId =  Math.random().toString(36).substring(2, 11)