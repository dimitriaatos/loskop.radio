import { z } from "zod";
import { baseShowSchema } from "./show";
import type { NestedShow } from "./show";
import { gql } from "~/assets/helpers";

export const baseProducerSchema = z.object({
  id: z.string(),
  slug: z.string(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  description: z.string().nullish(),
  avatar: z
    .object({
      id: z.string(),
    })
    .optional(),
});

export const producerSchema: any = baseProducerSchema.extend({
  shows: z.lazy(() => z.object({ shows_id: baseShowSchema }).array()),
});

export const producersSchema = producerSchema.array();

export type BaseProducer = z.infer<typeof baseProducerSchema>;

export type Producer = BaseProducer & {
  shows: NestedShow[];
};
export type NestedProducer = { producers_id: BaseProducer };

export const producerQueries = {
  producer: gql`
    query Producer($slug: String) {
      items {
        producers(filter: { slug: { _eq: $slug } }) {
          id
          slug
          first_name
          last_name
          description
          avatar {
            id
          }
          shows {
            shows_id {
              id
              slug
              title
              date
              live
              link
              artwork {
                id
              }
              audio {
                id
              }
              producers {
                producers_id {
                  id
                  slug
                  first_name
                  last_name
                }
              }
            }
          }
        }
      }
    }
  `,
  producers: gql`
    query Producers {
      items {
        producers {
          id
          slug
        }
      }
    }
  `,
};
