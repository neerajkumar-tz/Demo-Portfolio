import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      initialValue: 'Digital Marketing Strategist',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter / X URL',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'website',
      title: 'Website / Portfolio URL',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'image' },
  },
});
