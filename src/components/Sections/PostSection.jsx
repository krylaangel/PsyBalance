import Button from "@/components/ui/buttons/Button.jsx";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import Expanded from "@/common/Expanded.jsx";
import { useAuthStore } from "@/store/useAuthStore.js";
import { usePostsStore } from "@/store/usePostsStore.js";
import ConfirmModal from "@/common/ConfirmModal.jsx";
import { useState } from "react";

const PostSection = ({
  handleDetails,
  handleCreatePost,
  id,
  description,
  author,
  title,
  category,
  createdAt,
  tags,
  authorId,
}) => {
  const [modal, setModal] = useState(false);
  const user = useAuthStore((state) => state.user);
  console.log(authorId, user.id);
  const deleteArticle = usePostsStore((state) => state.deletePost);
  const handleConfirm = async () => {
    try {
      await deleteArticle(id);
    } finally {
      setModal(false);
    }
  };
  const handleClose = () => {
    setModal(false);
  };

  const isAuthorOrAdmin = user?.id === authorId || user?.role === "admin";

  return (
    <li key={id} className="page card">
      <h3 className="page__title">{title}</h3>
      <p className="page__category">Створено: {createdAt}</p>
      <p className="page__category">Категорія: {category}</p>
      <p className="page__category">Теги: {tags}</p>
      <p className="page__category">Автор: {author}</p>
      <Expanded className="page__description">{description}</Expanded>
      <div
        className={`flex flex-col sm:flex-row gap-2 w-full ${user?.role === "admin" ? "justify-between" : "justify-end"} `}
      >
        {isAuthorOrAdmin && (
          <Button
            className="sm:w-1/3"
            text={BUTTONS_TEXT.Edit}
            onClick={() => handleCreatePost(id)}
          />
        )}
        {isAuthorOrAdmin && (
          <Button
            className="sm:w-1/3 show"
            text={BUTTONS_TEXT.Delete}
            onClick={() => setModal(true)}
          />
        )}
        <Button
          className="sm:w-1/3"
          text={BUTTONS_TEXT.Details}
          onClick={() => handleDetails(id)}
        />
      </div>
      {modal && (
        <ConfirmModal
          confirm={() => handleConfirm()}
          confirmText={BUTTONS_TEXT.Delete}
          cancelText={BUTTONS_TEXT.Close}
          close={() => handleClose()}
        />
      )}
    </li>
  );
};
export default PostSection;
