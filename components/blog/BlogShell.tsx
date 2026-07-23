"use client";

import { useCallback, useState } from "react";
import BlogHeader from "./BlogHeader";
import BlogFooter from "./BlogFooter";
import BlogWaitlistModal from "./BlogWaitlistModal";
import { WaitlistContext } from "./waitlist-context";

/**
 * Chrome for every blog route: sticky header, footer, and the shared waitlist
 * modal. Any descendant can open the modal via `useWaitlist()`.
 */
export default function BlogShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openWaitlist = useCallback(() => setOpen(true), []);

  return (
    <WaitlistContext.Provider value={openWaitlist}>
      <div
        className="flex min-h-screen flex-col"
        style={{ background: "#F7F6F2" }}
      >
        <BlogHeader />
        <div className="flex-1">{children}</div>
        <BlogFooter />
      </div>
      {open && <BlogWaitlistModal onClose={() => setOpen(false)} />}
    </WaitlistContext.Provider>
  );
}
