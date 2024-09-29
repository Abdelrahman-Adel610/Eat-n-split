import { Button } from "./Button";
import { AddFriendForm } from "./AddFriendForm";
import { FriendItem } from "./FriendItem";

export function SideBar({
  friends,
  active,
  selectHandler,
  AddFriendHandler,
  AddFriendFormState,
  setAddFriendForm,
}) {
  return (
    <div className="sidebar">
      <ul>
        {friends.map((el, i) => (
          <FriendItem
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
