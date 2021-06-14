import UpdateContextProvider from "./context/UpdateContext";
import ListOfEmployee from './ListOfEmployee'



function App() {
  return (
    <div>
      <UpdateContextProvider>
          <ListOfEmployee />
      </UpdateContextProvider>
    </div>
  );
}

export default App;