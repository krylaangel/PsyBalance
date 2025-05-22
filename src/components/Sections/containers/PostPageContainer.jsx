import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/ui/Button.jsx";
import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useTotal } from "@/context/TotalContext.jsx";

const PostPageContainer = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { total } = useTotal();
  const handleNext = () => {
    const nextId = Number(id) + 1;
    navigate(`/post/${nextId}`);
  };
  const handlePrevious = () => {
    const nextId = Number(id) - 1;
    navigate(`/post/${nextId}`);
  };
  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`,
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

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error.message}</p>;

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
