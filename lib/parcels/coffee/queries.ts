import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/database.types";
const supabase = createClient();
import {
  Bean,
  NewBean,
  CoffeeLog,
  NewCoffeeLog,
  BeanAggregate,
  Tag,
  CoffeeLogFilters,
} from "./types";
import {
  CoffeeLogNotFoundError,
  CoffeeLogWriteError,
  BeanWriteError,
} from "./errors";

const BEANS = "beans";
const LOGS = "coffee_logs";
const TAGS = "tags";
const LOG_TAGS = "coffee_log_tags";

// ---------- beans ----------

export const getOrCreateBean = async (bean: NewBean): Promise<Bean> => {
  const { data: existing, error: findError } = await supabase
    .from(BEANS)
    .select("*")
    .eq("name", bean.name)
    .eq("roaster", bean.roaster)
    .eq("roast_profile", bean.roastProfile)
    .maybeSingle();

  if (findError) throw new BeanWriteError(findError.message);
  if (existing) return mapBeanRow(existing);

  const { data, error } = await supabase
    .from(BEANS)
    .insert({
      name: bean.name,
      roaster: bean.roaster,
      origin_type: bean.originType,
      roast_profile: bean.roastProfile,
    })
    .select("*")
    .single();

  if (error) throw new BeanWriteError(error.message);
  return mapBeanRow(data);
};

export const getAllBeans = async (): Promise<Bean[]> => {
  const { data, error } = await supabase.from(BEANS).select("*").order("name");
  if (error) throw new BeanWriteError(error.message);
  return (data ?? []).map(mapBeanRow);
};

export const getAllTags = async (): Promise<Tag[]> => {
  const { data, error } = await supabase.from(TAGS).select("*").order("name");
  if (error) throw new CoffeeLogWriteError(error.message);
  return data ?? [];
};

export const getBeanAggregate = async (
  beanId: string,
): Promise<BeanAggregate | null> => {
  const { data, error } = await supabase
    .from("bean_aggregates")
    .select("*")
    .eq("bean_id", beanId)
    .maybeSingle();

  if (error) throw new BeanWriteError(error.message);
  return data ? mapAggregateRow(data) : null;
};

// ---------- tags ----------

const getOrCreateTagIds = async (tagNames: string[]): Promise<string[]> => {
  if (!tagNames.length) return [];

  const { data: existing, error: findError } = await supabase
    .from(TAGS)
    .select("*")
    .in("name", tagNames);

  if (findError) throw new CoffeeLogWriteError(findError.message);

  const existingNames = new Set((existing ?? []).map((t) => t.name));
  const toCreate = tagNames.filter((name) => !existingNames.has(name));

  let created: Tag[] = [];
  if (toCreate.length) {
    const { data, error } = await supabase
      .from(TAGS)
      .insert(toCreate.map((name) => ({ name })))
      .select("*");
    if (error) throw new CoffeeLogWriteError(error.message);
    created = data ?? [];
  }

  return [...(existing ?? []), ...created].map((t) => t.id);
};

// ---------- coffee logs ----------

export const getLatestCoffeeLog = async (): Promise<CoffeeLog> => {
  const { data, error } = await supabase
    .from(LOGS)
    .select("*, coffee_log_tags(tag_id)")
    .order("brewed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new CoffeeLogWriteError(error.message);
  if (!data) throw new CoffeeLogNotFoundError();

  return mapLogRow(data);
};

export const getFilteredCoffeeLogs = async (
  filters: CoffeeLogFilters = {},
): Promise<CoffeeLog[]> => {
  let query = supabase.from(LOGS).select("*, coffee_log_tags(tag_id)");

  if (filters.brewMethod) query = query.eq("brew_method", filters.brewMethod);
  if (filters.overallMin !== undefined)
    query = query.gte("overall", filters.overallMin);
  if (filters.acidityMin !== undefined)
    query = query.gte("acidity", filters.acidityMin);
  if (filters.sweetnessMin !== undefined)
    query = query.gte("sweetness", filters.sweetnessMin);
  if (filters.bodyMin !== undefined) query = query.gte("body", filters.bodyMin);
  if (filters.aromaMin !== undefined)
    query = query.gte("aroma", filters.aromaMin);
  if (filters.fragranceMin !== undefined)
    query = query.gte("fragrance", filters.fragranceMin);
  if (filters.aftertasteMin !== undefined)
    query = query.gte("aftertaste", filters.aftertasteMin);

  const { data, error } = await query.order("brewed_at", { ascending: false });
  if (error) throw new CoffeeLogWriteError(error.message);

  let logs = (data ?? []).map(mapLogRow);

  // tag filter applied post-fetch: join table makes this a subquery either way,
  // simpler to filter in-memory at this scale than build a nested .in() against coffee_log_tags
  if (filters.tagIds?.length) {
    logs = logs.filter((log) =>
      filters.tagIds!.every((id) => log.tagIds.includes(id)),
    );
  }

  return logs;
};

export const createCoffeeLog = async (
  log: NewCoffeeLog,
  tagNames: string[] = [],
): Promise<CoffeeLog> => {
  const { data, error } = await supabase
    .from(LOGS)
    .insert({
      bean_id: log.beanId,
      brew_method: log.brewMethod,
      brew_time_seconds: log.brewTimeSeconds,
      dose_g: log.doseG,
      output_g: log.outputG,
      overall: log.overall,
      acidity: log.acidity,
      sweetness: log.sweetness,
      body: log.body,
      aroma: log.aroma,
      fragrance: log.fragrance,
      aftertaste: log.aftertaste,
      ...(log.brewedAt ? { brewed_at: log.brewedAt } : {}),
    })
    .select("*")
    .single();

  if (error) throw new CoffeeLogWriteError(error.message);

  const tagIds = await getOrCreateTagIds(tagNames);
  if (tagIds.length) {
    const { error: linkError } = await supabase
      .from(LOG_TAGS)
      .insert(
        tagIds.map((tagId) => ({ coffee_log_id: data.id, tag_id: tagId })),
      );
    if (linkError) throw new CoffeeLogWriteError(linkError.message);
  }

  return { ...mapLogRow(data), tagIds };
};

// ---------- row mappers ----------

const mapBeanRow = (row: Tables<"beans">): Bean => ({
  id: row.id,
  name: row.name,
  roaster: row.roaster,
  originType: row.origin_type,
  roastProfile: row.roast_profile,
  createdAt: row.created_at,
});

// coffee_log_tags is present only when the query embeds it
type LogRow = Tables<"coffee_logs"> & {
  coffee_log_tags?: Pick<Tables<"coffee_log_tags">, "tag_id">[];
};

const mapLogRow = (row: LogRow): CoffeeLog => ({
  id: row.id,
  beanId: row.bean_id,
  brewedAt: row.brewed_at,
  brewMethod: row.brew_method,
  brewTimeSeconds: row.brew_time_seconds,
  doseG: row.dose_g,
  outputG: row.output_g,
  // generated column: always set by Postgres, but typed nullable
  ratio: row.ratio ?? row.output_g / row.dose_g,
  overall: row.overall,
  acidity: row.acidity,
  sweetness: row.sweetness,
  body: row.body,
  aroma: row.aroma,
  fragrance: row.fragrance,
  aftertaste: row.aftertaste,
  tagIds: (row.coffee_log_tags ?? []).map((t) => t.tag_id),
});

// View columns are all typed nullable; a row only exists for a bean with brews,
// so the fallbacks never fire in practice
const mapAggregateRow = (row: Tables<"bean_aggregates">): BeanAggregate => ({
  beanId: row.bean_id ?? "",
  brewCount: row.brew_count ?? 0,
  overall: row.overall ?? 0,
  acidity: row.acidity ?? 0,
  sweetness: row.sweetness ?? 0,
  body: row.body ?? 0,
  aroma: row.aroma ?? 0,
  fragrance: row.fragrance ?? 0,
  aftertaste: row.aftertaste ?? 0,
});
