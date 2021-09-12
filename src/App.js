import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tour from "./Tour";
import Tours from "./Tours";
const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTours(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  useEffect(() => {
    fetchTours();
  }, []);
  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <section>
          <h2>No more tour</h2>
          <button className="btn" onClick={fetchTours}>
            Refresh Tours list
          </button>
        </section>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
