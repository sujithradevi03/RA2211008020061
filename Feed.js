import { useEffect, useState } from "react";
import { fetchPosts, getAuthToken } from "../api";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const token = await getAuthToken("clientID", "clientSecret");
      const { data } = await fetchPosts(token);
      setPosts(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Live Feed</h2>
      {loading ? <p>Loading...</p> : posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default Feed;
