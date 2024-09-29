import { Button } from "./Button";

export function FriendItem({ image, balance, name, id, state, selectHandler }) {
  return (
    <li className={state ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className={balance === 0 ? "" : balance > 0 ? "red" : "green"}>
        {balance === 0
          ? `You and ${name} are even`
          : balance > 0
          ? `You owe ${name} ${balance}€`
          : `${name} owes you ${-1 * balance}€`}
      </p>
      <Button onClickHandler={() => selectHandler(id)}>
        {state ? "close" : "select"}
      </Button>
    </li>
  );
}
