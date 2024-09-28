import { useState } from "react";
import { Button } from "./Button";

export function SplitBillForm({ friend, setFriends, selectHandler }) {
  const [bill, setBill] = useState("");
  const [yourExp, setyourExp] = useState("");
  const [sign, setSign] = useState(0);
  const friendExp = bill - yourExp;
  function formSubmitHandler(e) {
    e.preventDefault();
    setFriends((items) =>
      items.map((el) => {
        if (el.id === friend.id) {
          if (sign) {
            friend.balance = friend.balance + yourExp;
          } else {
            friend.balance = friend.balance - friendExp;
          }
        }
        return el;
      })
    );
    if (bill > 0 && yourExp >= 0 && friendExp >= 0) {
      setBill("");
      setyourExp("");
      setSign(0);
      selectHandler(friend.id);
    }
  }
  return (
    <form className="form-split-bill" onSubmit={formSubmitHandler}>
      <h2>Split a bill with {friend.name}</h2>
      <label htmlFor="value">💰 Bill value</label>
      <input
        type="text"
        id="value"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />
      <label htmlFor="YourExpense">🧍‍♀️ Your expense</label>
      <input
        type="text"
        id="YourExpense"
        value={yourExp}
        onChange={(e) =>
          +e.target.value <= bill ? setyourExp(+e.target.value) : ""
        }
      />
      <label htmlFor="FriendExpense">👫 {friend.name}'s expense</label>
      <input
        type="text"
        id="FriendExpense"
        disabled
        value={bill ? friendExp : ""}
      />
      <label htmlFor="pay">🤑 Who is paying the bill</label>
      <select
        id="pay"
        value={sign}
        onChange={(el) => setSign(+el.target.value)}
      >
        <option value={0} key="1">
          you
        </option>
        <option value={1} key="2">
          {friend.name}
        </option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
