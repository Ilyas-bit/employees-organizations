import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/Router";
import { store } from "./store/store";

const App = () => (
  <Provider store={store}>
    <Router>
      <AppRouter />
    </Router>
  </Provider>
);

export default App;
