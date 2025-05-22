import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import PostSection from "@/components/Sections/PostSection.jsx";
import { useTotal } from "@/context/TotalContext.jsx";

const PostsList = () => {
  const { products, loading, error } = useTotal();

  const navigate = useNavigate();
  const togglePostPage = (id) => {
    navigate(`/post/${id}`);
  };
  const handleDetails = (id) => {
    togglePostPage(id);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md my-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Список тестів</h2>
      {error && <p className="text-red-500">Помилка: {error.message}</p>}

      {loading ? (
        <p className="text-gray-500">Завантаження...</p>
      ) : (
        <ul className="space-y-4">
          {products.slice(0, 5).map((post) => (
            <PostSection
              id={post.id}
              key={post.id}
              category={post.category}
              title={post.title}
              description={post.description}
              handleDetails={handleDetails}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default PostsList;
