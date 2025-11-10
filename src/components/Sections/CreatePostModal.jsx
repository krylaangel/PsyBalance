import Button from "@/components/ui/buttons/Button.jsx";
import { BUTTONS_TEXT } from "@/constants/buttons.js";
import InputField from "@/components/ui/inputFields/InputField.jsx";
import { usePostsStore } from "@/store/usePostsStore.js";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore.js";

const CreatePostModal = ({ close }) => {
  const createPost = usePostsStore((state) => state.createPost);
  const navigate = useNavigate();
  const authorId = useAuthStore((state) => state.user.id);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    tags: [],
    category: "",
    content: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      tags: formData.tags,
      category: formData.category.trim(),
      content: formData.content.trim(),
      authorId: authorId,
    };
    const created = await createPost(newPost);
    if (created) {
      navigate(`/posts/${created.id}`);
    }
    close();
  };
  return (
    <div className="card p-5 inset-0 fixed opacity-100 z-50 bg-[var(--clr-button-disabled)] w-full">
      <div className="flex w-full justify-end pb-5">
        <Button onClick={close} text={BUTTONS_TEXT.Close}></Button>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <InputField
          name={"title"}
          type={"text"}
          value={formData.title}
          placeholder={"Заголовок"}
          min={3}
          max={50}
          onChange={handleChange}
        />
        <InputField
          placeholder="Автор"
          name="author"
          value={formData.author}
          onChange={handleChange}
          min={3}
          max={50}
        />
        <InputField
          placeholder="Категорія"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <InputField
          placeholder="Контент"
          name="content"
          value={formData.content}
          onChange={handleChange}
          textarea
          rows={4}
        />
        <Button
          type="submit"
          text={BUTTONS_TEXT.Create || "Створити"}
          className="bg-green-600 text-white"
        />
      </form>
    </div>
  );
};
export default CreatePostModal;
