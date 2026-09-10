// components/parcels/coffee/CoffeeLogForm.tsx
"use client";

import { useState, useEffect } from "react";
import { TickRow } from "./TickRow";
import { BeanCombobox } from "./BeanCombobox";
import { TagInput } from "./TagInput";
import { ChoiceGroup } from "./ChoiceGroup";
import { NumberStepper } from "./NumberStepper";
import {
  Bean,
  BeanOriginType,
  RoastProfile,
  BrewMethod,
  Tag,
} from "@/lib/parcels/coffee/types";
import {
  getAllBeans,
  getAllTags,
  getOrCreateBean,
  createCoffeeLog,
} from "@/lib/parcels/coffee/queries";

const BREW_METHODS: BrewMethod[] = [
  "espresso",
  "pourover",
  "aeropress",
  "french-press",
  "cold-brew",
  "moka-pot",
];
const ORIGIN_TYPES: BeanOriginType[] = ["single-origin", "blend"];
const ROAST_PROFILES: RoastProfile[] = [
  "light",
  "medium",
  "medium-dark",
  "dark",
];

type NewBeanDraft = {
  name: string;
  roaster: string;
  originType: BeanOriginType;
  roastProfile: RoastProfile;
};

export const CoffeeLogForm = () => {
  const [beans, setBeans] = useState<Bean[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [selectedBean, setSelectedBean] = useState<Bean | null>(null);
  const [newBeanDraft, setNewBeanDraft] = useState<NewBeanDraft | null>(null);

  const [brewMethod, setBrewMethod] = useState<BrewMethod>("espresso");
  const [brewTimeSeconds, setBrewTimeSeconds] = useState("");
  const [doseG, setDoseG] = useState("");
  const [outputG, setOutputG] = useState("");

  const [overall, setOverall] = useState<number | null>(null);
  const [acidity, setAcidity] = useState<number | null>(null);
  const [sweetness, setSweetness] = useState<number | null>(null);
  const [body, setBody] = useState<number | null>(null);
  const [aroma, setAroma] = useState<number | null>(null);
  const [fragrance, setFragrance] = useState<number | null>(null);
  const [aftertaste, setAftertaste] = useState<number | null>(null);

  const [tagNames, setTagNames] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [beanList, tagList] = await Promise.all([
          getAllBeans(),
          getAllTags(),
        ]);
        setBeans(beanList);
        setTags(tagList);
      } catch {
        setBeans([]);
        setTags([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const metrics = [
    overall,
    acidity,
    sweetness,
    body,
    aroma,
    fragrance,
    aftertaste,
  ];

  const hasValidBean =
    selectedBean !== null ||
    (newBeanDraft !== null &&
      newBeanDraft.name.trim().length > 0 &&
      newBeanDraft.roaster.trim().length > 0);

  const doseValue = Number(doseG);
  const outputValue = Number(outputG);
  const hasValidMeasurements =
    doseG.trim().length > 0 &&
    outputG.trim().length > 0 &&
    doseValue > 0 &&
    outputValue > 0;

  const canSubmit =
    hasValidBean &&
    hasValidMeasurements &&
    metrics.every((m) => m !== null) &&
    !isSubmitting;

  const handleSubmit = async () => {
    setError(null);
    if (!canSubmit) return;
    setIsSubmitting(true);

    try {
      const bean =
        selectedBean ??
        (await getOrCreateBean({
          name: newBeanDraft!.name,
          roaster: newBeanDraft!.roaster,
          originType: newBeanDraft!.originType,
          roastProfile: newBeanDraft!.roastProfile,
        }));

      await createCoffeeLog(
        {
          beanId: bean.id,
          brewMethod,
          brewTimeSeconds: brewTimeSeconds ? Number(brewTimeSeconds) : null,
          doseG: Number(doseG),
          outputG: Number(outputG),
          overall: overall!,
          acidity: acidity!,
          sweetness: sweetness!,
          body: body!,
          aroma: aroma!,
          fragrance: fragrance!,
          aftertaste: aftertaste!,
        },
        tagNames,
      );

      setSelectedBean(null);
      setNewBeanDraft(null);
      setBrewTimeSeconds("");
      setDoseG("");
      setOutputG("");
      setOverall(null);
      setAcidity(null);
      setSweetness(null);
      setBody(null);
      setAroma(null);
      setFragrance(null);
      setAftertaste(null);
      setTagNames([]);

      const [beanList, tagList] = await Promise.all([
        getAllBeans(),
        getAllTags(),
      ]);
      setBeans(beanList);
      setTags(tagList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to log brew");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-md py-8">
        <p className="text-sm text-[var(--text-muted)]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-4 py-8">
      <h1 className="font-serif text-lg text-[var(--text-base)]">New Brew</h1>

      <div className="border-t border-[var(--divider)] pt-4">
        <BeanCombobox
          beans={beans}
          onSelect={(bean) => {
            setSelectedBean(bean);
            setNewBeanDraft(null);
          }}
          onCreateNew={(draft) => {
            setSelectedBean(null);
            setNewBeanDraft(draft);
          }}
        />

        {newBeanDraft && (
          <div className="mt-3 space-y-3 border-l-2 border-[var(--accent)] pl-3">
            <input
              type="text"
              placeholder="Roaster"
              value={newBeanDraft.roaster}
              onChange={(e) =>
                setNewBeanDraft({ ...newBeanDraft, roaster: e.target.value })
              }
              className="w-full border-0 border-b border-[var(--divider)] bg-transparent py-1 text-sm text-[var(--text-base)] outline-none focus:border-[var(--accent)]"
            />

            <ChoiceGroup
              options={ORIGIN_TYPES}
              value={newBeanDraft.originType}
              onChange={(originType) =>
                setNewBeanDraft({ ...newBeanDraft, originType })
              }
            />

            <ChoiceGroup
              options={ROAST_PROFILES}
              value={newBeanDraft.roastProfile}
              onChange={(roastProfile) =>
                setNewBeanDraft({ ...newBeanDraft, roastProfile })
              }
            />
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-[var(--divider)] pt-4">
        <ChoiceGroup
          options={BREW_METHODS}
          value={brewMethod}
          onChange={setBrewMethod}
        />

        <NumberStepper
          placeholder="Brew time (s, optional)"
          value={brewTimeSeconds}
          onChange={setBrewTimeSeconds}
          step={5}
        />
        <NumberStepper
          placeholder="Dose (g)"
          value={doseG}
          onChange={setDoseG}
          step={0.5}
        />
        <NumberStepper
          placeholder="Output (g)"
          value={outputG}
          onChange={setOutputG}
          step={0.5}
        />
      </div>

      <div className="border-t border-[var(--divider)] pt-4">
        <TickRow label="Overall" value={overall} onChange={setOverall} />
        <TickRow label="Acidity" value={acidity} onChange={setAcidity} />
        <TickRow label="Sweetness" value={sweetness} onChange={setSweetness} />
        <TickRow label="Body" value={body} onChange={setBody} />
        <TickRow label="Aroma" value={aroma} onChange={setAroma} />
        <TickRow label="Fragrance" value={fragrance} onChange={setFragrance} />
        <TickRow
          label="Aftertaste"
          value={aftertaste}
          onChange={setAftertaste}
        />
      </div>

      <div className="border-t border-[var(--divider)] pt-4">
        <TagInput tags={tagNames} onChange={setTagNames} existingTags={tags} />
      </div>

      {error && <p className="text-sm text-[var(--highlight)]">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full border border-[var(--divider)] py-2 text-sm text-[var(--text-base)] disabled:opacity-40 enabled:hover:border-[var(--accent)]"
      >
        Log brew
      </button>
    </div>
  );
};
