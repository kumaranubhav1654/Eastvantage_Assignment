import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const userData: User = {
        name: {
          first: response.data.results[0].name.first,
          last: response.data.results[0].name.last
        },
        email: response.data.results[0].email
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      fetchUser();
    }
  }, []);

  const handleRefresh = () => {
    fetchUser();
  };

  return (
    <div className="App">
      <h1>User Details</h1>
      {user && (
        <div>
          <p>
            Name: {user.name.first} {user.name.last}
          </p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export default App;
