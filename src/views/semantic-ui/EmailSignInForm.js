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
    console.log('inside if')
    const errorStr =
      typeof err.errors === "Array" ? err.errors.join(" ") : err.errors;
      console.log(errorStr)

    throw new SubmissionError({ _error: errorStr });
  } else {
    console.log('in else')

    throw new SubmissionError({
      _error: "Invalid email/password combination"
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
