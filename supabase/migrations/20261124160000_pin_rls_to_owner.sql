-- Pin every coffee table to the single owner (SPEC: single-user, no user_id
-- columns, RLS pinned to the owner's UUID). Replaces "any signed-in user".
--
-- `to authenticated`: anon requests never match, so they get nothing.
-- `(select auth.uid())`: evaluated once per statement instead of per row.
-- The UUID is not a secret: auth.uid() comes from the signed JWT, which
-- can't be forged without the project's JWT secret.
--
-- bean_aggregates already has security_invoker = true (initial migration),
-- so it inherits these policies. No change needed there.

drop policy "authenticated access" on beans;
drop policy "authenticated access" on coffee_logs;
drop policy "authenticated access" on tags;
drop policy "authenticated access" on coffee_log_tags;

create policy "owner only" on beans
for all to authenticated
using ((select auth.uid()) = 'adf09e40-bf86-46d2-8ecb-00ccc256054b'::uuid)
with check ((select auth.uid()) = 'adf09e40-bf86-46d2-8ecb-00ccc256054b'::uuid);

create policy "owner only" on coffee_logs
for all to authenticated
using ((select auth.uid()) = 'adf09e40-bf86-46d2-8ecb-00ccc256054b'::uuid)
with check ((select auth.uid()) = 'adf09e40-bf86-46d2-8ecb-00ccc256054b'::uuid);

create policy "owner only" on tags
for all to authenticated
using ((select auth.uid()) = 'adf09e40-bf86-46d2-8ecb-00ccc256054b'::uuid)
with check ((select auth.uid()) = 'adf09e40-bf86-46d2-8ecb-00ccc256054b'::uuid);

create policy "owner only" on coffee_log_tags
for all to authenticated
using ((select auth.uid()) = 'adf09e40-bf86-46d2-8ecb-00ccc256054b'::uuid)
with check ((select auth.uid()) = 'adf09e40-bf86-46d2-8ecb-00ccc256054b'::uuid);

-- Rollback (run manually if needed):
-- drop policy "owner only" on beans;
-- drop policy "owner only" on coffee_logs;
-- drop policy "owner only" on tags;
-- drop policy "owner only" on coffee_log_tags;
-- create policy "authenticated access" on beans for all using (auth.uid() is not null) with check (auth.uid() is not null);
-- create policy "authenticated access" on coffee_logs for all using (auth.uid() is not null) with check (auth.uid() is not null);
-- create policy "authenticated access" on tags for all using (auth.uid() is not null) with check (auth.uid() is not null);
-- create policy "authenticated access" on coffee_log_tags for all using (auth.uid() is not null) with check (auth.uid() is not null);
