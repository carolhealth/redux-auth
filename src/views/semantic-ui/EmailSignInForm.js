import React from "react";
import { connect } from "react-redux";
import { reduxForm, SubmissionError } from "redux-form/immutable";
import { emailSignIn } from "../../actions/email-sign-in";
import EmailSignInFormView from "./EmailSignInFormView";

function mapStateToProps({ auth }, ownProps) {
  const endpoint =
    ownProps.endpoint ||
    auth.getIn(["configure", "currentEndpointKey"]) ||
    auth.getIn(["configure", "defaultEndpointKey"]);

  return {
    endpoint,
    form: "auth-emailSignIn-default",
    isSignedIn: auth.getIn(["user", "isSignedIn"])
  };
}

const handleFormErrors = err => {
  if (err && err.errors) {
    const errorStr =
      typeof err.errors === "Array" ? err.errors.join(" ") : err.errors;
    throw new SubmissionError({ _error: errorStr });
  } else {
    throw new SubmissionError({
      _error: "Something went wrong. Please try again"
    });
  }
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onSubmit: formData => {
      return dispatchProps
        .emailSignIn(formData.toJS(), stateProps.endpoint)
        .then(ownProps.next)
        .catch(handleFormErrors);
    }
  });
}

export default connect(mapStateToProps, { emailSignIn }, mergeProps)(
  reduxForm({})(EmailSignInFormView)
);
