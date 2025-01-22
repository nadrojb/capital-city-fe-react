import { useEffect, useState } from "react";
import { Header } from "../Header";

function GameBoard() {
  const [countriesData, setCountriesData] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [optionOneCountry, setOptionOneCountry] = useState(null);
  const [optionOneCapital, setOptionOneCapital] = useState(null);
  const [optionTwoCountry, setOptionTwoCountry] = useState(null);
  const [optionTwoCapital, setOptionTwoCapital] = useState(null);
  const [optionThreeCountry, setOptionThreeCountry] = useState(null);
  const [optionThreeCapital, setOptionThreeCapital] = useState(null);

  async function getAllCountries() {
    const response = await fetch("http://127.0.0.1:8001/api/countries");
    const data = await response.json();
    setCountriesData(data.data);
  }

  function getRandomCountry(countriesData) {
    const randomIndex = Math.floor(Math.random() * countriesData.length);
    return countriesData[randomIndex];
  }

  useEffect(() => {
    getAllCountries(setCountriesData);
  }, []);

  useEffect(() => {
    if (countriesData.length > 0) {
      const option1 = getRandomCountry(countriesData);
      const option2 = getRandomCountry(countriesData);
      const option3 = getRandomCountry(countriesData);

      setAnswer(option1.name);
      setOptionOneCountry(option1.name);
      setOptionOneCapital(option1.capital);
      setOptionTwoCountry(option2.name);
      setOptionTwoCapital(option2.capital);
      setOptionThreeCountry(option3.name);
      setOptionThreeCapital(option3.capital);

      console.log(option1.name);
      console.log(option1.capital);
      console.log(option2.name);
      console.log(option2.capital);
      console.log(option3.name);
      console.log(option3.capital);
    }
  }, [countriesData]);

  function handleSubmit(e) {
    e.preventDefault();
    const userChoice = e.target.elements.capital.value;
    if (userChoice == answer) {
      console.log("winner");
    }
  }

  return (
    <>
      <Header country={optionOneCountry} />
      <div>
        <h2>Choose your answer</h2>
        <form onSubmit={handleSubmit} action="" method="GET">
          <label>
            <input
              type="radio"
              name="capital"
              id="option1"
              value={optionOneCountry}
            />
            {optionOneCapital}
          </label>
          <label>
            <input
              type="radio"
              name="capital"
              id="option2"
              value={optionTwoCapital}
            />
            {optionTwoCapital}
          </label>
          <label>
            <input
              type="radio"
              name="capital"
              id="option3"
              value={optionThreeCapital}
            />
            {optionThreeCapital}
          </label>
          <div>
            <input type="submit" className="cursor-pointer" />
          </div>
        </form>
      </div>
    </>
  );
}

export default GameBoard;
