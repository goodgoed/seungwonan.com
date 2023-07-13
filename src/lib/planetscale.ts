import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

interface Views {
  slug: string;
  count: number;
}

interface Database {
  views: Views;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
