import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form/immutable";
import {
  Form,
  Button,
  Divider,
  Grid,
  Container,
  Icon,
  Segment,
  Message
} from "semantic-ui-react";
import Input from "./redux-form-components/Input";
import FormError from "./redux-form-components/FormError";

class EmailSignInForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object,
      submit: PropTypes.object
    }),
    next: PropTypes.func,
    submitComponent: PropTypes.func
  };

  static defaultProps = {
    inputProps: {
      email: {},
      password: {},
      submit: {}
    },
    next: () => {},
    submitComponent: Button
  };

  renderFormError(error) {
    console.log(error)
    return (
      <Grid.Column key="errors" width={16}>
        <FormError error={"Invalid email/password combination"} />
      </Grid.Column>
    );
  }

  render() {
    const {
      handleSubmit,
      error,
      submitting,
      dirty,
      valid,
      isSignedIn,
      inputProps,
      submitComponent
    } = this.props;
    const disabled = !valid || submitting || isSignedIn;
    const SubmitButton = submitComponent;

    return (
      <Form
        className="redux-auth email-sign-in-form clearfix"
        onSubmit={handleSubmit}
      >
        <Container>
          <Segment basic>
            <Grid padded className="input-fields">
              {/* {error && dirty && this.renderFormError(error)}
              <Grid.Column key="email" width={16}>
                <Field
                  component={Input}
                  fluid={Boolean(true)}
                  name="email"
                  label="Email"
                  type="email"
                  {...inputProps.email}
                />
              </Grid.Column> */}
              <Grid.Column key="password" width={16}>
                <Field
                  component={Input}
                  fluid={Boolean(true)}
                  name="password"
                  label="Password"
                  type="password"
                  {...inputProps.password}
                />
              </Grid.Column>
            </Grid>
          </Segment>
        </Container>
        <Divider fitted />
        <Container>
          <Segment basic>
            <Grid middle="true" aligned="true" padded>
              <Grid.Column width={8} verticalAlign="middle">
                {this.props.callToAction}
              </Grid.Column>
              <Grid.Column width={8} verticalAlign="middle">
                <SubmitButton
                  className="email-sign-up-submit"
                  disabled={disabled}
                  floated="right"
                  loading={submitting}
                  type="submit"
                  {...this.props.inputProps.submit}
                >
                  Sign In
                </SubmitButton>
              </Grid.Column>
            </Grid>
          </Segment>
        </Container>
      </Form>
    );
  }
}

export default EmailSignInForm;
