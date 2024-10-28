import { defineField, defineType } from "sanity";

export const playlist = defineType({
  name: "playlist",
  title: "Playlists",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      name: "select",
      type: "array",
      of: [{ type: "reference", to: [{ type: "startup" }] }],
    },
  ],
});
