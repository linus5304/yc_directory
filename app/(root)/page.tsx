import StartupCard from "@/components/startup-card";
import SearchForm from "../../components/search-form";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: {
        _id: 1,
        name: "Adrain",
      },
      _id: 1,
      description: "This is a description",
      image:
        "https://images.pexels.com/photos/3912979/pexels-photo-3912979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Robots",
      title: "We Robots",
    },
  ];
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
          {posts.map((post, index) => (
            <StartupCard key={post._id} post={post} />
          ))}
        </ul>
      </section>
    </div>
  );
}
