import {Switch} from '@/components/ui/switch';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.theme === 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [dark]);

  return (
    <div className="flex items-center space-x-2">
      <span>Light</span>
      <Switch checked={dark} onCheckedChange={setDark}/>
      <span>Dark</span>
    </div>
  );
}
