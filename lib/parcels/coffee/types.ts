export type RoastProfile = "light" | "medium" | "medium-dark" | "dark";
export type BeanOriginType = "single-origin" | "blend";
export type BrewMethod =
  | "espresso"
  | "pourover"
  | "aeropress"
  | "french-press"
  | "cold-brew"
  | "moka-pot";

export type Bean = {
  id: string;
  name: string;
  roaster: string;
  originType: BeanOriginType;
  roastProfile: RoastProfile;
  createdAt: string;
};

export type NewBean = Omit<Bean, "id" | "createdAt">;

export type CoffeeLog = {
  id: string;
  beanId: string;
  brewedAt: string;
  brewMethod: BrewMethod;
  brewTimeSeconds: number | null;
  doseG: number;
  outputG: number;
  ratio: number;
  overall: number;
  acidity: number;
  sweetness: number;
  body: number;
  aroma: number;
  fragrance: number;
  aftertaste: number;
  tagIds: string[];
};

export type NewCoffeeLog = Omit<
  CoffeeLog,
  "id" | "ratio" | "brewedAt" | "tagIds"
> & {
  brewedAt?: string;
  tagIds?: string[];
};

export type BeanAggregate = {
  beanId: string;
  brewCount: number;
  overall: number;
  acidity: number;
  sweetness: number;
  body: number;
  aroma: number;
  fragrance: number;
  aftertaste: number;
};

export type Tag = {
  id: string;
  name: string;
};

export type CoffeeLogFilters = {
  brewMethod?: BrewMethod;
  overallMin?: number;
  acidityMin?: number;
  sweetnessMin?: number;
  bodyMin?: number;
  aromaMin?: number;
  fragranceMin?: number;
  aftertasteMin?: number;
  tagIds?: string[];
  search?: string;
};
