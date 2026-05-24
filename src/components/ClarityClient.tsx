"use client";

import { useEffect } from 'react';

export default function ClarityClient() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (!id) return;

    let mounted = true;
    (async () => {
      try {
        const mod = await import('@microsoft/clarity');
        // package may export a function or object with start/init
        // try common entrypoints, fallback to script tag
        const c = (mod && (mod.default ?? mod)) as any;
        if (typeof c === 'function') {
          c(id);
          return;
        }
        if (c && typeof c.start === 'function') {
          c.start(id);
          return;
        }
        if (c && typeof c.init === 'function') {
          c.init(id);
          return;
        }
      } catch (e) {
        // ignore and fallback to script
      }

      if (!mounted) return;
      const s = document.createElement('script');
      s.src = `https://www.clarity.ms/tag/${process.env.NEXT_PUBLIC_CLARITY_ID}`;
      s.async = true;
      document.head.appendChild(s);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}
