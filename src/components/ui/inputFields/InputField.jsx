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
  textarea = false,
  ref,
}) => {
  return (
    <label className={`${styles.userSurveyFormLabel} ${className}`}>
      {label}
      {textarea ? (
        <textarea
          className={`${styles.userSurveyFormInput} resize-none min-h-[120px] ${className}`}
          name={name}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          min={min}
          max={max}
          ref={ref}
          rows={6}
        />
      ) : (
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
      )}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </label>
  );
};
export default InputField;
