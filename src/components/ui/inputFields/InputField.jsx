import styles from "./InputField.module.css";

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
    <label className={`${styles.userSurveyFormLabel} ${className}`}>
      {label}
      <input
        className={`${styles.userSurveyFormInput} ${className}`}
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
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </label>
  );
};
export default InputField;
