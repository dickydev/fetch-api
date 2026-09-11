import { useState } from "react";
import PostList from "./components/PostList";

function App() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <h1>Hello Dunia</h1>

      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "Close" : "Show"}
      </button>
      {show && <PostList />}
    </div>
  );
}
export default App;
