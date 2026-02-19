/* eslint-disable react-hooks/purity */
import './App.css'
import {useState} from "react";

function App() {

  const [questions, setquestions] = useState("");
  const [options, setoptions] = useState([]);
  const [correctans, setcorrectans] = useState(0);
  const [right, setright] = useState(0);
  const [wrong, setwrong] = useState(0);
  const [total, settotal] = useState(0);

  const max_ques = 10;

  const random_num = () => {
    return Math.floor(Math.random()*50)+1;
  }

  const random_op = () => {
    const op_value = Math.floor(Math.random()*4)+1;
    if(op_value === 1)
      return "+"
    if(op_value === 2)
      return "-"
    if(op_value === 3)
      return "*"
    if(op_value === 4)
      return "/"
  }


  const Answer = (num1, num2, operator) =>{
    switch(operator){
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return Math.floor(num1 / num2);
      default:
        return 0;
    }

  }

  const generate_ques = () =>{
    let num1 = random_num();
    let num2 = random_num();
    const operator = random_op();

    if (operator === "/")
      // if(num2===0) set b =1 else set return num2
      num2 = num2 === 0 ? 1 : num2;

    const answer = Answer(num1, num2, operator)

    const option1 = answer+2;
    const option2 = answer;
    const option3 = answer-1;
    const option4 = answer*(-1);

    setquestions(` ${num1} ${operator} ${num2} ?`);
    setcorrectans(answer);

    const op_random = Math.floor(Math.random()*4)+1;
    if(op_random === 1)
      setoptions([option2, option1, option4, option3])
    if(op_random === 2)
      setoptions([option1, option3, option4, option2])
    if(op_random === 3)
      setoptions([option1, option2, option4, option3])
    if(op_random === 4)
      setoptions([option4, option1, option2, option3])
  };

  const result_manager = (value) => {
      if(value === correctans )
        setright(right+1);
      else
        setwrong(wrong+1);

      settotal(total+1)

      if(max_ques > total+1)
        generate_ques();
      else
        setquestions("");
    };

  return (
    <>
    <div className="main">

      <div className="header">
        <h1>Mathelets</h1>
      </div>

      {questions === "" && total === 0 &&(
        <>
          <div className = "start">
            <button onClick={
              generate_ques
            }>START QUIZ</button>
          </div>
        </>
      ) }

      {questions && 
        <>
        <div className="quiz-container">
          <div className='question'>
            {questions}
          </div>
          <div className='options'>
            {
              options.map((opt,index) => { 
                return(
                <button key={index} onClick={() => {result_manager(opt)}}>
                  {opt}
                </button>
                );
              })
            }
          </div>
        </div>
        </>
      }

      {total === max_ques && (
      <>
        <div className='result'>
          <p>Total Questions : {total} </p>
          <p>Correct ✅ : {right} </p>
          <p>Wrong ❌ : {wrong} </p>
        </div>
        

        <div className="restart">
          <button onClick={() => {
            setright(0);
            setwrong(0);
            settotal(0);
            generate_ques();
          }}>Try Again</button>
      </div>
      </>
      )}

    </div>
    
    </>

  )
}

export default App
