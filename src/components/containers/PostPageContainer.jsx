import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import Button from "@/components/ui/buttons/Button.jsx";
import PostSkeletonForList from "@/components/ui/skeletons/PostSkeletonForList.jsx";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { ERRORS_STYLES } from "@/constants/errorStyle.js";
import { usePostsStore } from "@/store/usePostsStore.js";

const PostPageContainer = () => {
  const navigate = useNavigate();
  const post = usePostsStore((state) => state.post);
  const error = usePostsStore((state) => state.errorPost);
  const getPost = usePostsStore((state) => state.getPost);

  const { id } = useParams();
  const togglePost = () => {
    navigate(`/posts?page=${1}`);
  };
  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [getPost, id]);

  if (!post && !error) return <PostSkeletonForList />;

  if (!post && error)
    return (
      <p className={ERRORS_STYLES.warningClasses}>
        На жаль, такої статті не існує.
      </p>
    );

  return (
    <div className="clamp">
      <div className="page mt-4 card">
        <h2 className="page__title">{post.title}</h2>
        <p className="page__category">Створено: {post.createdAt}</p>
        <p className="page__category">Категорія: {post.category}</p>
        <p className="page__category">Автор: {post.author}</p>
        <p className="page__category">Теги: {post.tags}</p>
        <p className="page__description">{post.content}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            className="w-full"
            disabled={Number(id) === 1}
            text={BUTTONS_TEXT.Previous}
          />
          <Button
            className="w-full"
            text={BUTTONS_TEXT.Post}
            onClick={togglePost}
          />
          <Button className="w-full" text={BUTTONS_TEXT.Next} />
        </div>
      </div>
    </div>
  );
};

export default PostPageContainer;
