create table if not exists drugs (
  id serial primary key,
  generic_name text not null,
  brand_name text,
  manufacturer text,
  drug_class text,
  condition_tags text,
  mrp_price text,
  nlem_status boolean default false,
  hf_safe boolean default true,
  renal_warning text,
  hypoglycemia_risk text,
  source_site text,
  source_reference text
);

create table if not exists indian_guidelines (
  id serial primary key,
  source text,
  condition text,
  recommendation text,
  evidence_level text,
  tags text,
  source_reference text,
  source_url text
);

create table if not exists drug_interactions (
  id serial primary key,
  drug_a text,
  drug_b text,
  severity text,
  effect text,
  management text,
  tags text
);

create table if not exists hospital_formulary (
  id serial primary key,
  drug_id integer references drugs(id),
  in_stock boolean default true,
  pharmacy_notes text
);