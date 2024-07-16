import { useState } from "react";
import style from "./App.module.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className={style.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;

