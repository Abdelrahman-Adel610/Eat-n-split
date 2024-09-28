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
        <SplitBillForm
          friend={friends.find((el) => el.id === active)}
          setFriends={setFriends}
          selectHandler={selectHandler}
        />
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
function SplitBillForm({ friend, setFriends, selectHandler }) {
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
