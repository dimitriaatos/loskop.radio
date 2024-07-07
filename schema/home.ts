import { z } from "zod";
import { gql } from "~/assets/helpers";

export const homeSchema = z.object({
  description: z.string().optional(),
  image: z.object({
    filename_disk: z.string(),
  }).optional(),
});

export type Home = z.infer<typeof homeSchema>;

export const homeQuery = gql`
  query Home {
    items {
      home {
        image {
          filename_disk
        }
        description
      }
    }
  }
`;
