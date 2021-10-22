import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
      sendUserPasswordResetLink(email: $email) {
        code
        message
      }
    }
  `;
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,

      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    // send the email ans PW to the API
    await signup().catch(console.error);
    console.log({ data, loading, error });
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <h2>Reset Password</h2>
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check Your Email For a Link!</p>
        )}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
