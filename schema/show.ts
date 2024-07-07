import { z } from "zod";
import { gql } from "~/assets/helpers";
import type { NestedProducer } from "./producer";
import { baseProducerSchema } from "./producer";

const audioSchema = z.object({
  id: z.string(),
  duration: z.number().nullish(),
});

const sourceSchema = z.discriminatedUnion("live", [
  z.object({
    live: z.literal(true),
    link: z.string().url(),
    audio: audioSchema.nullish(),
    date: audioSchema.nullish(),
  }),
  z.object({
    live: z.literal(false),
    link: z.string().nullish(),
    audio: audioSchema,
    date: z.string(),
  }),
]);

const withoutSourceSchema = z
  .object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string().nullish(),
    artwork: z.object({
      id: z.string(),
    }),
    attachment: z
      .object({
        id: z.string(),
      })
      .nullish(),
  })
  .extend({
    producers: z.lazy(() =>
      z.object({ producers_id: baseProducerSchema }).array()
    ),
  });

export const baseShowSchema = z.intersection(withoutSourceSchema, sourceSchema);

export const showSchema = z.intersection(
  withoutSourceSchema.extend({
    producers: z.lazy(() =>
      z.object({ producers_id: baseProducerSchema }).array()
    ),
  }),
  sourceSchema
);

export const showsSchema = showSchema.array();

export type BaseShow = z.infer<typeof baseShowSchema>;
export type NestedShow = { shows_id: BaseShow };
export type Show = BaseShow & {
  producers: NestedProducer[];
};

export const showQueries = {
  show: gql`
    query Show($slug: String) {
      items {
        shows(filter: { slug: { _eq: $slug } }) {
          id
          slug
          title
          date
          live
          link
          description
          artwork {
            id
          }
          audio {
            id
            duration
          }
          attachment {
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
  `,
  shows: gql`
    query Shows($live: Boolean) {
      items {
        home {
          image {
            filename_disk
          }
        }
        shows(sort: "-date", filter: { live: { _eq: $live } }) {
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
          attachment {
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
  `,
};
