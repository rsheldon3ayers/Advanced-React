import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
      $email: String!
      $name: String!
      $password: String!
    ) {
      createUser(data: { email: $email, name: $name, password: $password }) {
        id
        email
        name
      }
    }
  `;
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,

    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

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
      <h2>Sign Up For An Account</h2>
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please Go ahead and Sign
            in!
          </p>
        )}
        <label htmlFor="email">
          Your Name
          <input
            type="name"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}
