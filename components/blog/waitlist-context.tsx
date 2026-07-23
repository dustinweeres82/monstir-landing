"use client";

import { createContext, useContext } from "react";

/** Opens the shared blog waitlist modal. */
export const WaitlistContext = createContext<() => void>(() => {});

export const useWaitlist = () => useContext(WaitlistContext);
