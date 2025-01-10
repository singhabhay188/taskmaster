import { GraphQLClient } from "graphql-request";

const endpoint =
  typeof window !== "undefined"
    ? `${window.location.origin}/api/graphql`
    : "/api/graphql";
const client = new GraphQLClient(endpoint);

export default client;
