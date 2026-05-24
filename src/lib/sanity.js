import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// ── Queries ──────────────────────────────────────────────────────────────────

export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, category, readTime, publishedAt, featured,
      coverImage { asset, alt }
    }`
  );
}

export async function getFeaturedPosts() {
  return client.fetch(
    `*[_type == "post" && featured == true] | order(publishedAt desc)[0..2] {
      _id, title, slug, excerpt, category, readTime, publishedAt,
      coverImage { asset, alt }
    }`
  );
}

export async function getRecentPosts(limit = 6) {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0..${limit - 1}] {
      _id, title, slug, excerpt, category, readTime, publishedAt,
      coverImage { asset, alt }
    }`
  );
}

export async function getPostBySlug(slug) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, category, readTime, publishedAt, body,
      coverImage { asset, alt },
      authorName, authorBio, authorImage { asset, alt },
      faqs
    }`,
    { slug }
  );
}

export async function getAllPostSlugs() {
  return client.fetch(`*[_type == "post"]{ "slug": slug.current }`);
}
