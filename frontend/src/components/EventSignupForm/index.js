import React from "react";
import { Field, reduxForm } from "redux-form";
import EventField from "./formfield";
import { required, email } from "./validators";
import "./style.css";

const EventSignupForm = ({ submitting, handleSubmit, error }) => (
  <div className="basic-grey">
    <h1>Event signup form</h1>
    <form className="event-signup-form" onSubmit={handleSubmit}>
      <Field
        name="firstname"
        type="text"
        label="First name"
        validate={required}
        component={EventField}
      />
      <Field
        name="lastname"
        type="text"
        label="Last name"
        validate={required}
        component={EventField}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        validate={[required, email]}
        component={EventField}
      />
      <Field
        name="eventdate"
        type="date"
        label="Event date"
        validate={required}
        component={EventField}
      />
      {error && <div className="error-message">{error}</div>}
      <div className="buttons">
        <button type="submit" className="submit-button" disabled={submitting}>
          Submit
        </button>
      </div>
    </form>
  </div>
);

export default reduxForm({ form: "EventSignupForm" })(EventSignupForm);
