import { useNavigate, useParams } from "react-router";
import Button from "@/components/ui/buttons/Button.jsx";
import { BUTTONS_TEXT } from "@/constants/buttons.js";
import PostSkeleton from "@/components/ui/PostSkeleton.jsx";
import { ERRORS_MESSAGE } from "@/constants/errorStyle.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTotal } from "@/context/TotalContext.jsx";
import { PAGINATION_LIMIT } from "@/constants/pagination.js";

const PostPageContainer = () => {
  const { total } = useTotal();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleNext = (id) => {
    const nextId = Number(id) + 1;
    navigate(`/post/${nextId}`);
  };
  const handlePrevious = (id) => {
    const nextId = Number(id) - 1;
    navigate(`/post/${nextId}`);
  };
  const togglePost = () => {
    const page = Math.ceil(Number(id) / PAGINATION_LIMIT);
    navigate(`/posts?page=${page}`);
  };

  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products/${Number(id)}`,
        );
        setPost(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, [id]);

  if (loading || !total) return <PostSkeleton />;
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
          onClick={() => handlePrevious(id)}
        />
        <Button text={BUTTONS_TEXT.Post} onClick={togglePost} />
        <Button
          disabled={Number(id) === total}
          text={BUTTONS_TEXT.Next}
          onClick={() => handleNext(id)}
        />
      </div>
    </div>
  );
};

export default PostPageContainer;
