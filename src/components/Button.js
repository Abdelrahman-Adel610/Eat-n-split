export function Button({ children, onClickHandler }) {
  return (
    <button className="button" onClick={onClickHandler}>
      {children}
    </button>
  );
}
