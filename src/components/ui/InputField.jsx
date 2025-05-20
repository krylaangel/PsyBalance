const InputField = ({
  className = "",
  type,
  name,
  id,
  value,
  placeholder,
  onChange,
  errorMessage,
  min,
  max,
  label,
  ref,
}) => {
  return (
    <label className={`user-survey-form__label ${className}`}>
      {label}
      <input
        className={`user-survey-form__input ${className}`}
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={onChange}
        ref={ref}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </label>
  );
};
export default InputField;
