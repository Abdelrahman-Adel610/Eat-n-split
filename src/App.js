import { useState } from "react";
const initialFriendList = [
  {
    name: "Anthony",
    imageUrl: "https://i.pravatar.cc/48?u=499476",
    balance: 4,
    id: 1,
  },
  {
    name: "Pop",
    imageUrl: "https://i.pravatar.cc/48?u=499422",
    balance: -4,
    id: 2,
  },
  {
    name: "Mike",
    imageUrl: "https://i.pravatar.cc/48?u=1921156",
    balance: 0,
    id: 3,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriendList);
  const [active, setActive] = useState("");
  function selectHandler(id) {
    if (id === active) setActive("");
    else setActive(id);
  }
  function AddFriendHandler(e, name, imageUrl) {
    e.preventDefault();
    if (!(name && imageUrl)) return;
    const newFriend = { name, imageUrl, id: friends.length + 2, balance: 0 };
    console.log(newFriend);

    setFriends((e) => [...e, newFriend]);
  }
  return (
    <div className="app">
      <SideBar
        friends={friends}
        active={active}
        selectHandler={selectHandler}
        AddFriendHandler={AddFriendHandler}
      />
      {active > 0 && (
        <SplitBillForm name={friends.find((el) => el.id === active).name} />
      )}
    </div>
  );
}
function SideBar({ friends, active, selectHandler, AddFriendHandler }) {
  const [AddFriendFormState, setAddFriendForm] = useState(false);

  return (
    <div className="sidebar">
      <ul>
        {friends.map((el, i) => (
          <FriendList
            image={el.imageUrl}
            name={el.name}
            balance={el.balance}
            key={i}
            id={el.id}
            state={el.id === active}
            selectHandler={selectHandler}
          />
        ))}
      </ul>
      {AddFriendFormState && (
        <AddFriendForm
          AddFriendHandler={AddFriendHandler}
          setAddFriendForm={setAddFriendForm}
        />
      )}
      <Button onClickHandler={() => setAddFriendForm((s) => !s)}>
        {AddFriendFormState ? "close" : "Add friend"}
      </Button>
    </div>
  );
}
export function FriendList({ image, balance, name, id, state, selectHandler }) {
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
function AddFriendForm({ AddFriendHandler, setAddFriendForm }) {
  const [name, setName] = useState("");
  const [URL, setURL] = useState("https://i.pravatar.cc/48");
  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => {
        AddFriendHandler(e, name, URL);
        if (name) setAddFriendForm(false);
      }}
    >
      <label htmlFor="friendName">👫 Friend name</label>
      <input
        type="text"
        id="friendName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="Image">🌄 Image URL</label>
      <input
        type="text"
        id="Image"
        value={URL}
        onChange={(e) => setURL(e.target.value)}
      />
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
function SplitBillForm({ name }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {name}</h2>
      <label htmlFor="value">💰 Bill value</label>
      <input type="text" id="value" />
      <label htmlFor="YourExpense">🧍‍♀️ Your expense</label>
      <input type="text" id="YourExpense" />
      <label htmlFor="FriendExpense">👫 {name}'s expense</label>
      <input type="text" id="FriendExpense" disabled />
      <label htmlFor="pay">🤑 Who is paying the bill</label>
      <select id="pay">
        <option value="you" key="1">
          you
        </option>
        <option value="Friend" key="2">
          {name}
        </option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
