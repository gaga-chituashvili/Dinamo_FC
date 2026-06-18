"use client";

import { Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { NotificationPopup } from "./NotificationPopup";
import { fetchNewsCount, getSeenCount, setSeenCount } from "./notifications.service";

interface Props {
  isLoggedIn: boolean;
}

export function BellButton({ isLoggedIn }: Props) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchNewsCount()
      .then((total) => setCount(Math.max(0, total - getSeenCount())))
      .catch(() => {});
  }, [isLoggedIn]);

  function handleOpen() {
    setOpen((v) => !v);
    if (!open) {
      fetchNewsCount()
        .then((total) => {
          setSeenCount(total);
          setCount(0);
        })
        .catch(() => {});
    }
  }

  if (!isLoggedIn) return null;

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="relative cursor-pointer border-none bg-transparent p-1 text-[#ccc] outline-none transition-opacity hover:opacity-70"
        aria-label="სიახლეები"
      >
        <Bell className="h-4 w-4" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#7fff5e] text-[9px] font-black text-black">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>
      <NotificationPopup isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
