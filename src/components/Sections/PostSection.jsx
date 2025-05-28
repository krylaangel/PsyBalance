import Button from "@/components/ui/buttons/Button.jsx";
import { BUTTONS_TEXT } from "@/constants/buttons.js";

const PostPage = ({ id, handleDetails, description, title, category }) => {
  return (
    <li key={id} className="page">
      <h3 className="page__title">{title}</h3>
      <p className="page__category">Номер: {id}</p>
      <p className="page__category">Категорія: {category}</p>
      <p className="page__description">{description}</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button text={BUTTONS_TEXT.Details} onClick={() => handleDetails(id)} />
        <Button text={BUTTONS_TEXT.Edit} />
        <Button text={BUTTONS_TEXT.Delete} />
      </div>
    </li>
  );
};
export default PostPage;
