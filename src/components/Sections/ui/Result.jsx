const Result = ({ matchedResult }) => {
  return (
    <div className="result-container">
      <h3 className="text-2xl font-semibold text-[var(--clr-secondary)] mb-4"></h3>
      <p className="text-lg text-[var(--clr-button-hover)] font-medium">
        {matchedResult}
      </p>
    </div>
  );
};
export default Result;
