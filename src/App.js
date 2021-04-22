import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [cars, setCars] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setCars(data);
      });
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const search = () => {
    const selectedCar = cars.filter((car) => {
      return car.make.includes(query);
    });
    return selectedCar;
  };
  console.log("seacrh", search());
  const getDataAfterFilter = () => {
    return query !== "" ? search() : cars;
  };

  return (
    <div className="head">
      <input placeholder="Search" onChange={(e) => handleChange(e)} />
      <div className="app">
        {getDataAfterFilter().map((car) => {
          return (
            <div key={car.id} className="app__car">
              {car.photos.map((image) => {
                return (
                  <div key={image.id} className="app__carImage">
                    <img src={image.img} alt="cars" />
                    <p>{car.make}</p>
                    <p>{car.price}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
