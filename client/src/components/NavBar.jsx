import { useEffect } from "react";
import "../css/NavBar.css";

const NavBar = () => {
  //Rooms Place holder
  const rooms = [
    {
      name: "Room 1",
      cost: 0.1,
      id: 1,
    },
    {
      name: "Room 2",
      cost: 0.3,
      id: 2,
    },
    {
      name: "Room 3",
      cost: 0.5,
      id: 3,
    },
  ];

  useEffect(() => {
    console.log(rooms);
  }, []);

  const displayRooms = () =>
    rooms.map((room) => (
      <>
        <ul
          key={room.id}
          className="room-container m-2 p-2 flex justify-between align-center text-center  "
        >
          <li>
            <button className="btn btn-wide">{room.name}</button>
          </li>
        </ul>
      </>
    ));

  //Clicked Function

  return (
    <>
      <div className="nav-bar h-full max-h-full flex flex-col justify-between p-0">
        <div className="room-list">{displayRooms()}</div>
      </div>
    </>
  );
};

export default NavBar;
