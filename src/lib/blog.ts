/**
 * Blog posts. To add the image for a post, drop the file at the `image` path
 * below (lowercase + hyphenated filenames keep URLs clean for SEO).
 * `imageAlt` is the alt text used for accessibility and search engines.
 */
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO — used for <time dateTime>
  dateLabel: string;
  readingTime: string;
  author: string;
  image: string;
  imageAlt: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-print-still-converts-in-a-digital-world",
    title: "Why Print Still Converts in a Digital-First World",
    excerpt:
      "Screens are crowded, but a well-made business card or brochure still earns attention. Here's why print remains one of the highest-trust channels available to your brand.",
    category: "Printing",
    date: "2026-06-18",
    dateLabel: "June 18, 2026",
    readingTime: "5 min read",
    author: "WebCraft Team",
    image: "/images/blog-print-conversion.jpg",
    imageAlt:
      "Freshly printed business cards and brochures laid out on a studio desk",
    body: [
      "Digital advertising costs keep climbing while attention keeps fragmenting. In that environment, a physical piece your customer can hold does something a banner ad cannot: it stays in the room.",
      "Print carries a trust signal that's difficult to fake. A thick, well-finished card communicates that a business invested in its own presentation — and customers read that as a proxy for how it will treat their work.",
      "The businesses seeing the best returns aren't choosing print over digital. They're using print as the tactile anchor in a campaign that also lives online, so a customer who meets you at an event can find you again the same evening.",
      "If you're planning a print run, start with the finish and work backwards. Paper weight, coating and edge treatment shape the first impression long before anyone reads a word of your copy.",
    ],
  },
  {
    slug: "seo-foundations-that-actually-move-rankings",
    title: "SEO Foundations That Actually Move Rankings",
    excerpt:
      "Most SEO advice is noise. These are the fundamentals that consistently move the needle for small and mid-sized businesses competing against bigger budgets.",
    category: "SEO",
    date: "2026-05-30",
    dateLabel: "May 30, 2026",
    readingTime: "7 min read",
    author: "WebCraft Team",
    image: "/images/blog-seo-foundations.jpg",
    imageAlt:
      "Analytics dashboard showing organic search traffic growth over time",
    body: [
      "Search visibility rarely comes from a clever trick. It comes from a site that loads fast, answers a real question, and makes it obvious to a crawler what each page is about.",
      "Start with technical hygiene: clean URLs, descriptive titles, a sensible heading structure and images that carry meaningful alt text. These are unglamorous and they compound.",
      "Then earn relevance. One genuinely useful page about the thing you actually do will outperform a dozen thin pages built to chase keywords. Search engines have spent years getting better at telling those apart.",
      "Finally, measure the right thing. Rankings fluctuate daily and will drive you mad. Track qualified enquiries instead — that's the number your business is actually paid on.",
    ],
  },
  {
    slug: "building-a-brand-that-outlasts-a-trend",
    title: "Building a Brand That Outlasts a Trend",
    excerpt:
      "Logos age. Colour palettes fall out of fashion. A brand system built on a clear point of view keeps working long after the visual trends have moved on.",
    category: "Branding",
    date: "2026-05-12",
    dateLabel: "May 12, 2026",
    readingTime: "6 min read",
    author: "WebCraft Team",
    image: "/images/blog-brand-system.jpg",
    imageAlt:
      "Brand style guide open to a page showing colour swatches and typography",
    body: [
      "A brand is not a logo. The logo is the smallest, most visible part of a much larger system — and it's the part that dates fastest.",
      "What lasts is a point of view: who you serve, what you refuse to do, and the tone you take when you say it. Those decisions outlive any particular typeface.",
      "The practical test is simple. Hand your guidelines to someone who has never met you and ask them to produce a social post. If what comes back feels like you, the system is working.",
      "Build for the boring moments too — the invoice, the email signature, the packing slip. Consistency across the unglamorous touchpoints is what makes a small business read as a serious one.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
