export function Answers({ option1, option2, option3 }) {

function handleSubmit (e) {
    e.preventDefault();
    const userChoice = e.target.elements.capital.value;
    console.log('user choice', userChoice);
    
}

  return (
    <>
      <div>
        <h2>Choose your answer</h2>
        <form onSubmit={handleSubmit}  action="" method="GET">
          <label>
            <input type="radio" name="capital" id="option1" value={option1} />
            {option1}
          </label>
          <label>
            <input type="radio" name="capital" id="option2" value={option2} />
            {option2}
          </label>
          <label>
            <input type="radio" name="capital" id="option3" value={option3} />
            {option3}
          </label>
          <div>
          <input type="submit" className="cursor-pointer" />
          </div>
        </form>
      </div>
    </>
  );
}
