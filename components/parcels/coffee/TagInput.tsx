// components/parcels/coffee/TagInput.tsx
"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Tag } from "@/lib/parcels/coffee/types";

type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
  existingTags: Tag[];
};

export const TagInput = ({ tags, onChange, existingTags }: TagInputProps) => {
  const [input, setInput] = useState("");
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

  const normalizedInput = input.trim().toLowerCase();

  const suggestions = existingTags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(normalizedInput) &&
      !tags.some((t) => t.toLowerCase() === tag.name.toLowerCase()),
  );

  const commitTag = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (tags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      setInput("");
      return;
    }
    onChange([...tags, trimmed]);
    setInput("");
    setIsOpen(false);
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitTag(input);
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--divider)] py-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 border border-[var(--divider)] px-2 py-0.5 text-xs text-[var(--text-base)]"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
              className="text-[var(--text-muted)] hover:text-[var(--highlight)]"
            >
              ×
            </button>
          </span>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Add tags" : ""}
          className="flex-1 border-0 bg-transparent py-0.5 text-sm text-[var(--text-base)] outline-none"
        />
      </div>

      {isOpen && input.length > 0 && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full border border-[var(--divider)] bg-[var(--bg-base)]">
          {suggestions.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => commitTag(tag.name)}
              className="block w-full px-2 py-1 text-left text-sm text-[var(--text-base)] hover:bg-[var(--divider)]"
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
