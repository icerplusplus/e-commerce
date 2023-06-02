import { BrowserRouter } from "react-router-dom";
import Layyout from "./components/Layout";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <Layyout />
      </DndProvider>
    </BrowserRouter>
  );
}

export default App;
