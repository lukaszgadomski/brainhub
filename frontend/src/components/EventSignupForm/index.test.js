import React from "react";
import ReactDOM from "react-dom";
import EventSignupForm from "./index";
import { mount } from "enzyme";
import sinon from "sinon";
import { reducer as reduxFormReducer } from "redux-form";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { SubmissionError } from "redux-form";

describe("<EventSignupForm/>", () => {
  let store, root, form;
  let fields = ["firstname", "lastname", "email", "eventdate"];
  let handleSubmit = sinon.stub().returns(Promise.resolve({ ok: true }));

  beforeEach(() => {
    store = createStore(combineReducers({ form: reduxFormReducer }));
    root = mount(
      <Provider store={store}>
        <EventSignupForm onSubmit={handleSubmit} />
      </Provider>
    );
    form = root.find("form");
  });

  it("empty required fields, show error message", () => {
    form.simulate("submit");
    root.update();

    //check if handleSubmit stub is not called because of errors
    expect(handleSubmit.callCount).toBe(0);
    fields.forEach(field => {
      let validationError = root.find(`label.${field} .error`);
      expect(validationError.length).toBe(1);
      expect(validationError.text()).toBe("Field is required");
    });
  });

  it("change input events, show error message", () => {
    let inputValues = ["", "", "luke@", ""];
    let expectedErrors = [
      "Field is required",
      "Field is required",
      "Invalid email address",
      "Field is required"
    ];
    fields.forEach((field, index) => {
      let input = root.find(`label.${field} input`);
      input.simulate("change", {
        target: {
          value: inputValues[index]
        }
      });
    });
    form.simulate("submit");
    root.update();

    fields.forEach((field, index) => {
      let validationError = root.find(`label.${field} .error`);
      expect(validationError.length).toBe(1);
      expect(validationError.text()).toBe(expectedErrors[index]);
    });
  });

  it("call eventapi when validation is ok", () => {
    let inputValues = [
      "lukasz",
      "gadomski",
      "brumugun@gmail.com",
      "2017-07-13"
    ];
    fields.forEach((field, index) => {
      let input = root.find(`label.${field} input`);
      input.simulate("change", {
        target: {
          value: inputValues[index]
        }
      });
    });
    form.simulate("submit");
    root.update();

    expect(handleSubmit.callCount).toBe(1);
  });

  it("not responding api, show error message", () => {
    let inputValues = [
      "lukasz",
      "gadomski",
      "brumugun@gmail.com",
      "2017-07-13"
    ];
    let handleRejectSubmit = sinon.stub().callsFake(() => {
      throw new SubmissionError({ _error: "api is not responding" });
    });
    let root = mount(
      <Provider store={store}>
        <EventSignupForm onSubmit={handleRejectSubmit} />
      </Provider>
    );
    let form = root.find("form");
    fields.forEach((field, index) => {
      let input = root.find(`label.${field} input`);
      input.simulate("change", {
        target: {
          value: inputValues[index]
        }
      });
    });
    form.simulate("submit");
    root.update();
    expect(handleRejectSubmit.callCount).toBe(1);
    let errorMessage = root.find(".error-message");
    expect(errorMessage.length).toBe(1);
    expect(errorMessage.text()).toBe("api is not responding");
  });
});
