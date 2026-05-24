"use client";

import { useEffect } from 'react';

export default function ClarityClient() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;

    if (!projectId) {
      return;
    }

    let active = true;

    void import('@microsoft/clarity').then(({ default: Clarity }) => {
      if (!active) {
        return;
      }

      Clarity.init(projectId);
    });

    return () => {
      active = false;
    };
  }, []);

  return null;
}
