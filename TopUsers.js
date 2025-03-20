import { useEffect, useState } from "react";
import { fetchUsers, fetchPosts, getAuthToken } from "../api";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const loadTopUsers = async () => {
      const token = await getAuthToken("clientID", "clientSecret");
      const { data: users } = await fetchUsers(token);
      const { data: posts } = await fetchPosts(token);

      const postCount = posts.reduce((acc, post) => {
        acc[post.userId] = (acc[post.userId] || 0) + 1;
        return acc;
      }, {});

      const sortedUsers = users
        .map((user) => ({ ...user, postCount: postCount[user.id] || 0 }))
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, 5);

      setTopUsers(sortedUsers);
    };
    loadTopUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top Users</h2>
      <ul>
        {topUsers.map((user) => (
          <li key={user.id} className="p-2 border-b">
            {user.name} - {user.postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
