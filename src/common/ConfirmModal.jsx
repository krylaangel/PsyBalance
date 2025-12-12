import Button from "@/components/ui/buttons/Button.jsx";

const ConfirmModal = ({ confirmText, cancelText, confirm, close }) => {
  return (
    <div className="w-full p-10 fixed inset-0 items-center justify-center flex flex-col gap-5 border border-gray-200 rounded-md shadow-lg z-50 opacity-100 bg-[var(--clr-button-disabled)]">
      <h1 className="text-base text-[var(--clr-text)] w-full text-center">
        Ви дійсно хочете видалити статтю
      </h1>
      <div className="flex gap-5">
        <Button onClick={close} text={cancelText}></Button>
        <Button onClick={confirm} text={confirmText}></Button>
      </div>
    </div>
  );
};
export default ConfirmModal;
