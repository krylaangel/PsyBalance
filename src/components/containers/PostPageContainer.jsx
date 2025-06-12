import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/ui/buttons/Button.jsx";
import PostSkeletonForList from "@/components/ui/skeletons/PostSkeletonForList.jsx";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { ERRORS_STYLES } from "@/constants/errorStyle.js";
import { PAGINATION_LIMIT } from "@/constants/pagination.js";
import { useTotalStore } from "@/store/useTotalStore.js";
import { thunkPost } from "@/temp/redux/thunks/thunkPost.js";
import { thunkNeighborPosts } from "@/temp/redux/thunks/thunkNeighborPosts.js";

const PostPageContainer = () => {
  const { post, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { total, fetchTotal } = useTotalStore();
  const { id } = useParams();
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
      fetchTotal().catch((err) => console.error(err));
    }
  }, [error, fetchTotal, total]);

  useEffect(() => {
    if (id) {
      dispatch(thunkPost(id));
      dispatch(thunkNeighborPosts(Number(id)));
    }
  }, [dispatch, id]);

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
    </div>
  );
};

export default PostPageContainer;
