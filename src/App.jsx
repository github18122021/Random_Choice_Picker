import {  useState } from "react";

export default function App() {
  let [choiceToAdd, setChoiceToAdd] = useState("");
  let [choices, setChoices] = useState([]);
  let [randomized, setRandomized] = useState(false);

  // fn to add the choice in the list
  function handleAddChoice() {

    // edge case: if the choiceToAdd is empty
    if(choiceToAdd.trim() === "") {
      return;
    }

    setChoices((currentChoices) => {
      return [...currentChoices, choiceToAdd];
    });
    setChoiceToAdd("");
  }

  // fn to handle the input of the choice
  function handleChoiceToAdd(e) {
    setChoiceToAdd(e.target.value);
  }

  function handleRandomChoice() {
    // edge case: if the choices array is empty
    if(choices.length === 0) {
      return;
    }

    let randomIndex = Math.floor(Math.random() * choices.length);

    
    // using promise
    async function randomize() {
      
      for(let i = 1; i < 5; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            setRandomized((prevRandomized) => !prevRandomized);

            if(i === 4) {
              setTimeout(() => {
                setChoices((prevChoices) => [prevChoices[randomIndex]]);
              })
            }
          }, i * 1000);
          resolve();
        })

        // alert(i);
      }
    }

    randomize();

    // using setInterval

    // let count = 0;

    // let intervalId = setInterval(() => {
    //   setRandomized((prevRandomized) => !prevRandomized);

    //   if(count === 3) {
    //     clearInterval(intervalId);
    //     setTimeout(() => {
    //       setChoices((prevChoices) => [prevChoices[randomIndex]]);
    //     })
    //   }
    //   count++;
      
    // }, 1000);

    // using setTimeout

    // let colorToggle = function(i) {
    //   setTimeout(() => {
    //     setRandomized((prevRandomized) => !prevRandomized);

    //     if(i === 2) {
    //       setTimeout(() => {
    //         setChoices((prevChoices) => [prevChoices[randomIndex]]);
    //       }, 1000)
    //     }

    //   }, i * 1000);
    // }

    // for(let i = 0; i < 3; i++) {
    //   colorToggle(i);
    // }

  }



  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10">
        Random Choice Picker
      </h1>

      <section className="flex justify-center mt-10">
        <input
          className="border-2 border-gray-500 p-2 mr-2"
          type="text"
          value={choiceToAdd}
          onChange={handleChoiceToAdd}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddChoice}
        >
          Add a choice
        </button>
      </section>

      <section className="flex justify-center mt-10">
        <button
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleRandomChoice}
        >
          Pick a random choice
        </button>
      </section>

      <section className="flex justify-center mt-10">
        {choices.length > 0 ? (
          <ul className="flex justify-center">
            {choices.map((choice, index) => {
              let color;
              if (randomized) {
                color = index % 2 === 0 ? "green" : "blue";
              } else {
                color = index % 2 === 0 ? "blue" : "green";
              }

              return (
                <li
                  key={index}
                  className={`bg-${color}-600 mr-3 p-3 rounded-md`}
                >
                  {choice}
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>
    </>
  );
}
