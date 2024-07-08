import { z } from "zod";
import { gql } from "~/assets/helpers";

export const aboutSchema = z.object({
  description: z.string().optional(),
});

export type About = z.infer<typeof aboutSchema>;

export const aboutQuery = gql`
  query About {
    items {
      home {
        image {
          filename_disk
        }
      }
      about {
        description
      }
    }
  }
`;
