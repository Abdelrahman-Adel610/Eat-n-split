import { useState } from "react";
const initialFriendList = [
  {
    name: "Anthony",
    imgaeUrl: "https://i.pravatar.cc/48?u=499476",
    balance: 4,
  },
  {
    name: "Pop",
    imgaeUrl: "https://i.pravatar.cc/48?u=499422",
    balance: -4,
  },
  {
    name: "Mike",
    imgaeUrl: "https://i.pravatar.cc/48?u=1921156",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriendList);
  return (
    <di className="app">
      <SideBar friends={friends} />
      <SplitBillForm />
    </di>
  );
}
function SideBar({ friends }) {
  const [AddFriendFormState, setAddFriendForm] = useState(false);
  return (
    <div className="sidebar">
      <ul>
        {friends.map((el) => (
          <FriendList image={el.imgaeUrl} name={el.name} balance={el.balance} />
        ))}
      </ul>
      {AddFriendFormState && <AddFriendForm />}
      <Button onClickHandler={() => setAddFriendForm((s) => !s)}>
        {AddFriendFormState ? "close" : "Add friend"}
      </Button>
    </div>
  );
}
export function FriendList({ image, balance, name }) {
  // const [addFriend]
  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className="green">name owes you 10€</p>
      <Button>Select</Button>
    </li>
  );
}
function AddFriendForm() {
  return (
    <form className="form-add-friend">
      <label for="friendName">👫 Friend name</label>
      <input type="text" id="friendName" />
      <label for="Image">🌄 Image URL</label>
      <input type="text" id="Image" value="https://i.pravatar.cc/48" />
      <Button>Add</Button>
    </form>
  );
}
function Button({ children, onClickHandler }) {
  return (
    <button className="button" onClick={onClickHandler}>
      {children}
    </button>
  );
}
function SplitBillForm() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with Clark</h2>
      <label for="value">💰 Bill value</label>
      <input type="text" id="value" />
      <label for="YourExpense">🧍‍♀️ Your expense</label>
      <input type="text" id="YourExpense" />
      <label for="FriendExpense">👫 Friend's expense</label>
      <input type="text" id="FriendExpense" disabled />
      <label for="pay">🤑 Who is paying the bill</label>
      <select id="pay">
        <option value="you" key="1">
          you
        </option>
        <option value="Friend" key="2">
          Friend
        </option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
