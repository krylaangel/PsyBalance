import { useNavigate, useParams } from "react-router";
import Button from "@/components/ui/buttons/Button.jsx";
import { BUTTONS_TEXT } from "@/constants/buttons.js";
import PostSkeleton from "@/components/ui/PostSkeleton.jsx";
import { ERRORS_MESSAGE } from "@/constants/errorStyle.js";
import { useEffect, useState } from "react";
import { PAGINATION_LIMIT } from "@/constants/pagination.js";
import { useTotalStore } from "@/store/useTotalStore.js";
import { PostsService } from "@/service/PostsService.js";

const PostPageContainer = () => {
  const { total, fetchTotal } = useTotalStore();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const navigateTo = (offset) => {
    navigate(`/post/${Number(id) + offset}`);
  };
  const togglePost = () => {
    const page = Math.ceil(Number(id) / PAGINATION_LIMIT);
    navigate(`/posts?page=${page}`);
  };
  useEffect(() => {
    if (total === 0) {
      fetchTotal().catch(setError);
    }
  }, [fetchTotal, total]);

  useEffect(() => {
    setLoading(true);
    PostsService.fetchPost(id)
      .then(setPost)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PostSkeleton />;
  if (error)
    return (
      <p className={ERRORS_MESSAGE.errorClasses}>Помилка: {error.message}</p>
    );
  if (!post)
    return (
      <p className={ERRORS_MESSAGE.warningClasses}>
        На жаль, такої статті не існує.
      </p>
    );

  return (
    <div className="page mt-4">
      <h2 className="page__title">{post.title}</h2>
      <p className="page__category">Категорія: {post.category}</p>
      <p className="page__description">{post.description}</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          disabled={Number(id) === 1}
          text={BUTTONS_TEXT.Previous}
          onClick={() => navigateTo(-1)}
        />
        <Button text={BUTTONS_TEXT.Post} onClick={togglePost} />
        <Button
          disabled={Number(id) === total}
          text={BUTTONS_TEXT.Next}
          onClick={() => navigateTo(1)}
        />
      </div>
    </div>
  );
};

export default PostPageContainer;
