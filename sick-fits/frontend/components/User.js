import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # TODO cart
      }
    }
  }
`;
export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}

// export default function User() {

// }
