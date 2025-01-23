import { useEffect, useState } from "react";
import { Header } from "../Header";
import { FormInput } from "../FormInput";
import { countriesURL } from "../../config";

function GameBoard() {
  const [countriesData, setCountriesData] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [optionOneCountry, setOptionOneCountry] = useState(null);
  const [optionOneCapital, setOptionOneCapital] = useState(null);
  const [optionTwoCountry, setOptionTwoCountry] = useState(null);
  const [optionTwoCapital, setOptionTwoCapital] = useState(null);
  const [optionThreeCountry, setOptionThreeCountry] = useState(null);
  const [optionThreeCapital, setOptionThreeCapital] = useState("");
  const [result, setResult] = useState("");
  const [modalState, setModalState] = useState(false);
  const [error, setError] = useState("");

  async function getAllCountries() {
    try {
      const response = await fetch(countriesURL);
      const data = await response.json();
      setCountriesData(data.data);
      setError('');
    } catch (e) {
      setError("Unable to retrieve data");
    }
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
    }
  }, [countriesData]);

  function handleSubmit(e) {
    e.preventDefault();
    const userChoice = e.target.elements.capital.value;
    if (userChoice == answer) {
      setResult("Correct!");
      setModalState(true);
    } else {
      setResult(`Incorrect! the correct answer is: ${optionOneCapital}`);
      setModalState(true);
    }
  }

  function resetGame() {
    setResult("");
    setModalState(false);
    getAllCountries();
  }

  return (
    <>
      {error && (
        <div className="text-center mt-5 text-red-600 font-semibold text-3xl">
          <h1>Error: {error}</h1>
        </div>
      )}
      <div className="text-center mt-40 px-4">
        <Header country={optionOneCountry} />
        <div>
          <h2 className="mt-4 text-white">Select your answer:</h2>
          <form onSubmit={handleSubmit} action="" method="GET">
            <div className="text-center mt-4 sm:w-5/12 mx-auto">
              <FormInput
                id={optionOneCountry}
                value={optionOneCountry}
                labelValue={optionOneCapital}
              />
              <FormInput
                id={optionTwoCountry}
                value={optionTwoCapital}
                labelValue={optionTwoCapital}
              />
              <FormInput
                id={optionThreeCountry}
                value={optionThreeCapital}
                labelValue={optionThreeCapital}
              />
            </div>
            <div>
              <input
                type="submit"
                className="cursor-pointer bg-green-500 w-24 h-9 font-semibold rounded-md mt-4"
              />
            </div>
          </form>
        </div>
        {modalState ? (
          <div className="bg-white w-11/12 sm:w-6/12 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-3/4 rounded-md">
            <h1 className="mt-24 text-3xl font-semibold"> {result}</h1>
            <button
              onClick={resetGame}
              className="cursor-pointer bg-green-500 w-24 h-9 font-semibold rounded-md mt-4"
            >
              Restart
            </button>
          </div>
        ) : (
          <div className="bg-white w-11/12 sm:w-6/12 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-3/4 rounded-md hidden">
            <h1 className="mt-24 text-3xl font-semibold">{result}</h1>
            <button
              onClick={resetGame}
              className="cursor-pointer bg-green-500 w-24 h-9 font-semibold rounded-md mt-4"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default GameBoard;
