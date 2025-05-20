import { useEffect, useState } from "react";

const PostsList = () => {
  const [test, setTest] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let timer;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }
        const data = await response.json();
        timer = setTimeout(() => {
          setTest(data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md my-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Список тестів</h2>
      {error && <p className="text-red-500">Помилка: {error.message}</p>}

      {loading ? (
        <p className="text-gray-500">Завантаження...</p>
      ) : (
        <ul className="space-y-4">
          {test.slice(0, 5).map((post) => (
            <li
              key={post.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow transition-shadow"
            >
              <p className="text-sm text-gray-400">ID: {post.id}</p>
              <h3 className="text-lg font-semibold text-gray-900">
                {post.title}
              </h3>
              <p className="text-gray-700">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default PostsList;
