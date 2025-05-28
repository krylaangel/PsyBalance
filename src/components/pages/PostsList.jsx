import { useNavigate, useSearchParams } from "react-router";
import PostSection from "@/components/Sections/PostSection.jsx";
import PostSkeleton from "@/components/ui/PostSkeleton.jsx";
import { ERRORS_MESSAGE } from "@/constants/errorStyle.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTotal } from "@/context/TotalContext.jsx";
import Button from "@/components/ui/buttons/Button.jsx";
import { renderPageNumbers } from "@/utils/renderPageNumbers.js";
import { PAGINATION_LIMIT } from "@/constants/pagination.js";

const PostsList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = PAGINATION_LIMIT;
  const { total } = useTotal();
  const togglePostPage = (id) => {
    navigate(`/post/${id}`);
  };
  const handleDetails = (id) => {
    togglePostPage(id);
  };
  const handlePageChange = (newPage) => {
    setSearchParams({ page: String(newPage) });
  };

  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`,
        );
        setProducts(response.data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, [limit, page]);
  const totalPages = Math.ceil(total / limit);
  if (page < 1) {
    handlePageChange(1);
    return null;
  }

  if (total > 0 && page > totalPages) {
    handlePageChange(totalPages);
    return null;
  }
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md my-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Список тестів</h2>
      {error && (
        <p className={ERRORS_MESSAGE.errorClasses}>Помилка: {error.message}</p>
      )}
      {loading ? (
        <PostSkeleton />
      ) : (
        <ul className="space-y-4">
          {products.map((post) => (
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
      <div className="flex mt-4 gap-x-2">
        <Button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          text="Назад"
        />
        {renderPageNumbers({ totalPages, setPage: handlePageChange, page })}
        <Button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          text="Вперед"
        />
      </div>
    </div>
  );
};
export default PostsList;
