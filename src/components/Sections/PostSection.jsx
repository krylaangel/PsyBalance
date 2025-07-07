import Button from "@/components/ui/buttons/Button.jsx";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import Expanded from "@/common/Expanded.jsx";

const PostPage = ({ id, handleDetails, description, title, category }) => {
  return (
    <li key={id} className="page card">
      <h3 className="page__title">{title}</h3>
      <p className="page__category">Номер: {id}</p>
      <p className="page__category">Категорія: {category}</p>
      <Expanded className="page__description" valueClampLine={2}>
        {description}
      </Expanded>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          className="w-full"
          text={BUTTONS_TEXT.Details}
          onClick={() => handleDetails(id)}
        />
        <Button className="w-full" text={BUTTONS_TEXT.Edit} />
        <Button className="w-full" text={BUTTONS_TEXT.Delete} />
      </div>
    </li>
  );
};
export default PostPage;
