import { useState, useMemo } from 'react';

export function useLocalSearch(items, key = 'name') {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((item) =>
      String(item[key] || '').toLowerCase().includes(q)
    );
  }, [items, query, key]);

  return { query, setQuery, filtered };
}
