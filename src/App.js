import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import About from "./component/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./component/Alert";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="SMARTNOTE"/>
        <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
          <SignUp/>
          </Route>
        </Switch>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
