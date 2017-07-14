import { SubmissionError } from "redux-form";
import config from "../../config";

export default values => {
  return fetch(config.API_EVENT_SIGNUP_URL, {
    method: "POST",
    body: JSON.stringify(values)
  })
    .then(result => {
      if (result.ok) {
        alert(
          `Hey ${values.firstname}! You have signed up for the event at: ${values.eventdate}`
        );
      }
      return result;
    })
    .catch(error => {
      if (error.validationErrors) {
        throw new SubmissionError(error.validationErrors);
      } else {
        throw new SubmissionError({ _error: "api is not responding" });
      }
    });
};
