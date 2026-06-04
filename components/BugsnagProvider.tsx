'use client';

import { useEffect } from 'react';
import { startBugsnag } from '@/lib/bugsnag';

export default function BugsnagProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startBugsnag();
  }, []);

  return <>{children}</>;
}
