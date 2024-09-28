import { useState } from "react";
import { SideBar } from "./SideBar";
import { SplitBillForm } from "./SplitBillForm";
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
  const [AddFriendFormState, setAddFriendForm] = useState(false);
  const [friends, setFriends] = useState(initialFriendList);
  const [active, setActive] = useState("");
  function selectHandler(id) {
    if (id === active) setActive("");
    else {
      setActive(id);
      setAddFriendForm(false);
    }
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
        AddFriendFormState={AddFriendFormState}
        setAddFriendForm={setAddFriendForm}
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
