import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../../data/site';
import { getPosts, entrySlug } from '../../i18n/content';

export async function GET(context: APIContext) {
  const posts = await getPosts('id');

  return rss({
    title: `${site.brand} — Catatan`,
    description: 'Esai dan catatan tentang pengembangan web, performa, dan kerajinan perangkat lunak.',
    site: context.site ?? new URL(site.url),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/id/blog/${entrySlug(post)}/`,
    })),
    customData: '<language>id</language>',
  });
}
