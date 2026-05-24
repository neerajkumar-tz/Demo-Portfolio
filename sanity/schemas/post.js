import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'SEO', value: 'SEO' },
          { title: 'Social Media', value: 'Social Media' },
          { title: 'Content Marketing', value: 'Content Marketing' },
          { title: 'PPC & Ads', value: 'PPC & Ads' },
          { title: 'Analytics', value: 'Analytics' },
          { title: 'Email Marketing', value: 'Email Marketing' },
          { title: 'Branding', value: 'Branding' },
          { title: 'Growth Hacking', value: 'Growth Hacking' },
        ],
      },
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
        },
        {
          type: 'table',
          title: 'Comparison Table'
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            {
              name: 'text',
              type: 'text',
              title: 'Callout Text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'type',
              type: 'string',
              title: 'Callout Type (Color & Border Accent)',
              options: {
                list: [
                  { title: 'Info (Electric Blue)', value: 'info' },
                  { title: 'Warning (Vibrant Yellow)', value: 'warning' },
                  { title: 'Success (Emerald Green)', value: 'success' },
                  { title: 'Important (Electric Orange)', value: 'important' },
                ],
              },
              initialValue: 'info',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      description: 'Choose a reusable author profile (Name, Role, Bio, Image). This overrides manual overrides below.',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name (Manual Override)',
      type: 'string',
    }),
    defineField({
      name: 'authorBio',
      title: 'Author Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
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
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faq',
          title: 'FAQ Item',
          fields: [
            {
              name: 'question',
              type: 'string',
              title: 'Question',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              type: 'text',
              title: 'Answer',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', category: 'category', media: 'coverImage' },
    prepare({ title, category, media }) {
      return { title, subtitle: category, media };
    },
  },
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
