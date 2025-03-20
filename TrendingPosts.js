import { useEffect, useState } from "react";
import { fetchPosts, fetchComments, getAuthToken } from "../api";
import PostCard from "../components/PostCard";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const loadTrendingPosts = async () => {
      const token = await getAuthToken("clientID", "clientSecret");
      const { data: posts } = await fetchPosts(token);
      const { data: comments } = await fetchComments(token);

      const commentCount = comments.reduce((acc, comment) => {
        acc[comment.postId] = (acc[comment.postId] || 0) + 1;
        return acc;
      }, {});

      const maxComments = Math.max(...Object.values(commentCount));

      const topPosts = posts.filter((post) => commentCount[post.id] === maxComments);

      setTrendingPosts(topPosts);
    };
    loadTrendingPosts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Trending Posts</h2>
      {trendingPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default TrendingPosts;
