import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});
