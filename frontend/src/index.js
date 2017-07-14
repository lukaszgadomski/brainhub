import React from "react";
import ReactDOM from "react-dom";
import EventSignupForm from "./components/EventSignupForm";
import ApiEvent from "./components/EventSignupForm/apievent";
import store from "./store";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <EventSignupForm onSubmit={ApiEvent} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
