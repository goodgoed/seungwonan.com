import "server-only";

import { queryBuilder } from "./planetscale";

export async function getPostViews() {
  return queryBuilder.selectFrom("views").select(["slug", "count"]).execute();
}
