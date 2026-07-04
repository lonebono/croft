-- enums
create type roast_profile as enum ('light', 'medium', 'medium-dark', 'dark');
create type bean_origin_type as enum ('single-origin', 'blend');
create type brew_method as enum ('espresso', 'pourover', 'aeropress', 'french-press', 'cold-brew', 'moka-pot');

-- beans
create table beans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  roaster text not null,
  origin_type bean_origin_type not null,
  roast_profile roast_profile not null,
  created_at timestamptz not null default now(),
  unique (name, roaster, roast_profile)
);

-- coffee_logs
create table coffee_logs (
  id uuid primary key default gen_random_uuid(),
  bean_id uuid not null references beans(id) on delete restrict,
  brewed_at timestamptz not null default now(),
  brew_method brew_method not null,
  brew_time_seconds integer,
  dose_g numeric(5,2) not null,
  output_g numeric(5,2) not null,
  ratio numeric(5,2) generated always as (output_g / dose_g) stored,
  overall smallint not null check (overall between 1 and 5),
  acidity smallint not null check (acidity between 1 and 5),
  sweetness smallint not null check (sweetness between 1 and 5),
  body smallint not null check (body between 1 and 5),
  aroma smallint not null check (aroma between 1 and 5),
  fragrance smallint not null check (fragrance between 1 and 5),
  aftertaste smallint not null check (aftertaste between 1 and 5),
  created_at timestamptz not null default now()
);

-- tags
create table tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table coffee_log_tags (
  coffee_log_id uuid not null references coffee_logs(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (coffee_log_id, tag_id)
);

-- aggregates
create view bean_aggregates as
select
  bean_id,
  count(*) as brew_count,
  round(avg(overall), 2) as overall,
  round(avg(acidity), 2) as acidity,
  round(avg(sweetness), 2) as sweetness,
  round(avg(body), 2) as body,
  round(avg(aroma), 2) as aroma,
  round(avg(fragrance), 2) as fragrance,
  round(avg(aftertaste), 2) as aftertaste
from coffee_logs
group by bean_id;

-- indexes
create index coffee_logs_bean_id_idx on coffee_logs (bean_id);
create index coffee_logs_brewed_at_idx on coffee_logs (brewed_at desc);

-- rls
create policy "authenticated access" on beans
for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "authenticated access" on coffee_logs
for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "authenticated access" on tags
for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "authenticated access" on coffee_log_tags
for all using (auth.uid() is not null) with check (auth.uid() is not null);

alter view bean_aggregates set (security_invoker = true);

alter table beans enable row level security;
alter table coffee_logs enable row level security;
alter table tags enable row level security;
alter table coffee_log_tags enable row level security;