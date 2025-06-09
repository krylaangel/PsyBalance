import { useNavigate, useSearchParams } from "react-router";
import PostSection from "@/components/Sections/PostSection.jsx";
import PostSkeletonForList from "@/components/ui/PostSkeletonForList.jsx";
import { ERRORS_MESSAGE } from "@/constants/errorStyle.js";
import { useCallback, useEffect } from "react";
import Button from "@/components/ui/buttons/Button.jsx";
import { Pagination } from "@/components/ui/pagination/Pagination.jsx";
import { PAGINATION_LIMIT } from "@/constants/pagination.js";
import { useTotalStore } from "@/store/useTotalStore.js";
import { useDispatch, useSelector } from "react-redux";
import { thunksPosts } from "@/service/thunks/thunksPosts.js";

const PostsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, error, loading } = useSelector((state) => state.posts);

  const { total, fetchTotal } = useTotalStore();
  let [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page"), 10) || 1;
  const limit = PAGINATION_LIMIT;
  const totalPages = Math.ceil(total / limit);

  const togglePostPage = (id) => {
    navigate(`/post/${id}`);
  };

  const handleDetails = (id) => {
    togglePostPage(id);
  };

  const handlePageChange = useCallback(
    (newPage) => {
      setSearchParams({ page: String(newPage) });
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (total === 0) {
      fetchTotal().catch((err) => console.error(err));
    }
  }, [error, fetchTotal, total]);

  useEffect(() => {
    dispatch(thunksPosts({ page, limit }));
  }, [dispatch, limit, page]);

  useEffect(() => {
    if (page < 1) {
      handlePageChange(1);
    } else if (total > 0 && page > totalPages) {
      handlePageChange(totalPages);
    }
  }, [handlePageChange, page, total, totalPages]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Статті</h2>
      {error && <p className={ERRORS_MESSAGE.errorClasses}>Помилка: {error}</p>}
      {loading ? (
        <PostSkeletonForList />
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
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
        {Pagination({ totalPages, setPage: handlePageChange, page })}
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
