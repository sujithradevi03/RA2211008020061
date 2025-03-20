import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Social Media Analytics</h1>
      <div>
        <Link className="mx-2" to="/">Feed</Link>
        <Link className="mx-2" to="/top-users">Top Users</Link>
        <Link className="mx-2" to="/trending-posts">Trending Posts</Link>
      </div>
    </nav>
  );
};

export default Navbar;
