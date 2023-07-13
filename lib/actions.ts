import { GraphQLClient } from 'graphql-request';
import { createUserMutation, getUserQuery } from '../graphql';

const isProduction = process.env.NODE_ENV === 'production';
// const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : '';
const apiUrl = process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '';
const apiKey = process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';
const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};
