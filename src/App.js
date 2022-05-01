
import './App.css';
import { BrowserRouter, Route, Routes,Switch } from 'react-router-dom';
import TodoList from './containers/todoList';
import TodoDetails from './containers/todoDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
              <Route path='/' element = {<TodoList />} exact />
              <Route path='/todos/:todoId' element = { <TodoDetails />} exact />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
