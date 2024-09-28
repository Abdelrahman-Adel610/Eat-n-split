import { useState } from "react";
import { AddFriendForm, Button } from "./Button";
import { FriendList } from "./FriendList";

export function SideBar({ friends, active, selectHandler, AddFriendHandler }) {
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
