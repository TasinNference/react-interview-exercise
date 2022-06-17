import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const users = useRef([])
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([])

  const filterUsers = () => {
    return users.current.filter((user) => {
      console.log(user.name.first.includes(searchText))
      return user.name.first.toLowerCase().includes(searchText.trim().toLowerCase()) || user.name.last.toLowerCase().includes(searchText.trim().toLowerCase())
    })
  }

  useEffect(() => {
    setFilteredUsers(filterUsers)
  }, [searchText])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {
          data: { results },
        } = await axios.get("https://randomuser.me/api/?results=100");
        users.current = results;
        setFilteredUsers(results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="App">
      <div className="users-box">
        <div className="search-container">
          <input className="search-box" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <div className="users-grid">
        {filteredUsers.length > 0 ? (filteredUsers.map((user) => (
          <div className="user-profile">
            <img alt="User" src={user.picture.large} className="user-img" />
            <div className="user-data">
              <div>{user.name.first} {user.name.last}</div>
            </div>
          </div>
        ))) : <div>No results</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
