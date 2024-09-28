import { useState } from "react";
import { Button } from "./Button";

export function AddFriendForm({ AddFriendHandler, setAddFriendForm }) {
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
