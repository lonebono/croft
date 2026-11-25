// components/parcels/coffee/BeanCombobox.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Bean, BeanOriginType, RoastProfile } from "@/lib/parcels/coffee/types";

type BeanComboboxProps = {
  beans: Bean[];
  onSelect: (bean: Bean | null) => void;
  onCreateNew: (draft: {
    name: string;
    roaster: string;
    originType: BeanOriginType;
    roastProfile: RoastProfile;
  }) => void;
};

export const BeanCombobox = ({
  beans,
  onSelect,
  onCreateNew,
}: BeanComboboxProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const matches = beans.filter(
    (bean) =>
      bean.name.toLowerCase().includes(normalizedQuery) ||
      bean.roaster.toLowerCase().includes(normalizedQuery),
  );

  const exactMatch = beans.some(
    (bean) => bean.name.toLowerCase() === normalizedQuery,
  );

  const showCreateOption = normalizedQuery.length > 0 && !exactMatch;

  const handleSelect = (bean: Bean) => {
    setQuery(bean.name);
    setIsOpen(false);
    onSelect(bean);
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          onSelect(null);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Bean name"
        className="w-full border-0 border-b border-[var(--divider)] bg-transparent py-1 text-sm text-[var(--text-base)] outline-none focus:border-[var(--accent)]"
      />

      {isOpen && (query.length > 0 || matches.length > 0) && (
        <div className="absolute z-10 mt-1 w-full border border-[var(--divider)] bg-[var(--bg-base)]">
          {matches.map((bean) => (
            <button
              key={bean.id}
              type="button"
              onClick={() => handleSelect(bean)}
              className="block w-full px-2 py-1 text-left text-sm text-[var(--text-base)] hover:bg-[var(--divider)]"
            >
              {bean.name} — {bean.roaster}
            </button>
          ))}

          {showCreateOption && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onCreateNew({
                  name: query.trim(),
                  roaster: "",
                  originType: "single-origin",
                  roastProfile: "medium",
                });
              }}
              className="block w-full border-t border-[var(--divider)] px-2 py-1 text-left text-sm text-[var(--highlight)]"
            >
              + Create &quot;{query.trim()}&quot;
            </button>
          )}
        </div>
      )}
    </div>
  );
};
