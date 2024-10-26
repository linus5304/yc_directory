import StartupCard, { StartupCardType } from "@/components/startup-card";
import SearchForm from "../../components/search-form";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <div>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.map((post: StartupCardType) => (
            <StartupCard key={post._id} post={post} />
          ))}
        </ul>
      </section>

      <SanityLive />
    </div>
  );
}
