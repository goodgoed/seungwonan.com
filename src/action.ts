"use server";

import { queryBuilder } from "./lib/planetscale";

export async function incrementView(slug: string) {
  const data = await queryBuilder
    .selectFrom("views")
    .where("slug", "=", slug)
    .select(["count"])
    .execute();

  const views = !data.length ? 0 : Number(data[0].count);

  return queryBuilder
    .insertInto("views")
    .values({ slug, count: 1 })
    .onDuplicateKeyUpdate({ count: views + 1 })
    .execute();
}
