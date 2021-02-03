import React, { useState, useEffect } from "react";

const SingleFriend = ({ friendName, friendId, handleRemoveFriend }) => {
  const [person, setPerson] = useState(false);
  const [id, setId] = useState(false);

  useEffect(() => {
    setPerson(friendName);
    setId(friendId);
  }, []);

  return person ? (
    <li key={person}>
      {person}
      <button onClick={() => handleRemoveFriend(friendId)}>Usuń ziomka</button>
    </li>
  ) : null;
};

export default SingleFriend;
