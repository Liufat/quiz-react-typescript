import { useReducer } from "react";

//  先規劃好reducer內用的state架構
const initialState = { count: 0, step: 1 };
// 我們在這個專案中，需要使用count與step兩個state

// 然後規劃好reducer中，會用到幾種type
type ACTIONTYPE =
  | { type: "dec" }
  | { type: "inc" }
  | { type: "defineCount"; payload: Number }
  | { type: "defineStep"; payload: Number }
  | { type: "reset" };

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "dec":
      return { count: state.count - state.step, step: state.step };
    case "inc":
      return { count: state.count + state.step, step: state.step };
    case "defineCount":
      return { count: Number(action.payload), step: state.step };
    case "defineStep":
      return { count: state.count, step: Number(action.payload) };
    case "reset":
      return { count: 0, step: 1 };
    default:
      throw new Error();
  }
};

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1)

  const [count, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count.count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    // setCount(Number(e.target.value));
    dispatch({ type: "defineCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "defineStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={count.step}
          onChange={defineStep}
        />
        <span>{count.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
