import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const RESET_MUTATION = gql`
    mutation RESET_MUTATION(
      $email: String!
      $token: String!
      $password: String!
    ) {
      redeemUserPasswordResetToken(
        email: $email
        token: $token
        password: $password
      ) {
        code
        message
      }
    }
  `;
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,

    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  console.log('====================================================', error);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    // send the email ans PW to the API
    await reset().catch(console.error);
    console.log({ data, loading, error });
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error || successfulError} />
      <h2>Reset Password</h2>
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in</p>
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
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
