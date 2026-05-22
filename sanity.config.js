import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { table } from '@sanity/table';
import { schemaTypes } from './sanity/schemas/index';

export default defineConfig({
  name: 'alex-rivera-portfolio',
  title: 'Alex Rivera — Portfolio & Blog',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Blog Posts').child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem().title('Categories').child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
    visionTool(),
    table(),
  ],
  schema: { types: schemaTypes },
});