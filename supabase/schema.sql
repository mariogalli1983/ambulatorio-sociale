create extension if not exists pgcrypto;
create table locations(id uuid primary key default gen_random_uuid(), name text not null, address text, active boolean default true);
create table services(id uuid primary key default gen_random_uuid(), name text not null, active boolean default true);
create table specialists(id uuid primary key default gen_random_uuid(), full_name text not null, email text not null, active boolean default true);
create table slots(id uuid primary key default gen_random_uuid(), location_id uuid references locations, service_id uuid references services, specialist_id uuid references specialists, starts_at timestamptz not null, ends_at timestamptz not null, booked boolean default false);
create table bookings(id uuid primary key default gen_random_uuid(), slot_id uuid unique references slots, first_name text not null, last_name text not null, birth_date date not null, email text not null, phone text not null, symptom text, diagnosed boolean default false, diagnosis text, privacy_version text not null, created_at timestamptz default now(), cancelled_at timestamptz, cancel_token uuid default gen_random_uuid());
create table audit_log(id bigint generated always as identity primary key, actor uuid, action text not null, entity_type text, entity_id uuid, created_at timestamptz default now());
alter table locations enable row level security; alter table services enable row level security; alter table specialists enable row level security; alter table slots enable row level security; alter table bookings enable row level security;
create policy "public active locations" on locations for select using(active=true);
create policy "public active services" on services for select using(active=true);
create policy "public free slots" on slots for select using(booked=false and starts_at>now());
-- NON creare policy pubbliche su bookings o specialists. Le prenotazioni vanno create da una Edge Function con validazione server-side.
