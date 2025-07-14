'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Toggle } from '@/components/ui/toggle';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <Toggle
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="group relative size-8 rounded-full border-none text-muted-foreground shadow-none transition hover:bg-muted"
      onPressedChange={() => setTheme(isDark ? 'light' : 'dark')}
      pressed={isDark}
      variant="outline"
    >
      <MoonIcon
        className="absolute scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
        size={16}
      />
      <SunIcon
        className="absolute scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
        size={16}
      />
    </Toggle>
  );
}
