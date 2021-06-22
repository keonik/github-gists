import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  raw_url?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
};

export type Gist = {
  __typename?: 'Gist';
  url: Scalars['String'];
  id: Scalars['String'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
  forks_url: Scalars['String'];
  commits_url: Scalars['String'];
  node_id: Scalars['String'];
  git_pull_url: Scalars['String'];
  git_push_url: Scalars['String'];
  html_url: Scalars['String'];
  public?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  comments?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['String']>;
  comments_url?: Maybe<Scalars['String']>;
  owner?: Maybe<Owner>;
  truncated?: Maybe<Scalars['Boolean']>;
  files?: Maybe<Array<Maybe<File>>>;
};

export type Owner = {
  __typename?: 'Owner';
  login?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  node_id?: Maybe<Scalars['String']>;
  avatar_url?: Maybe<Scalars['String']>;
  gravatar_id?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  html_url?: Maybe<Scalars['String']>;
  followers_url?: Maybe<Scalars['String']>;
  following_url?: Maybe<Scalars['String']>;
  gists_url?: Maybe<Scalars['String']>;
  starred_url?: Maybe<Scalars['String']>;
  subscriptions_url?: Maybe<Scalars['String']>;
  organizations_url?: Maybe<Scalars['String']>;
  repos_url?: Maybe<Scalars['String']>;
  events_url?: Maybe<Scalars['String']>;
  received_events_url?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  site_admin?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  gistsByUsername?: Maybe<Array<Maybe<Gist>>>;
  gistsById?: Maybe<Gist>;
};


export type QueryGistsByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryGistsByIdArgs = {
  id: Scalars['String'];
};


export type GistsByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GistsByUsernameQuery = (
  { __typename?: 'Query' }
  & { gistsByUsername?: Maybe<Array<Maybe<(
    { __typename?: 'Gist' }
    & Pick<Gist, 'id' | 'description' | 'created_at' | 'updated_at'>
  )>>> }
);


export const GistsByUsernameDocument = gql`
    query GistsByUsername($username: String!) {
  gistsByUsername(username: $username) {
    id
    description
    created_at
    updated_at
  }
}
    `;

/**
 * __useGistsByUsernameQuery__
 *
 * To run a query within a React component, call `useGistsByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGistsByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGistsByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGistsByUsernameQuery(baseOptions: Apollo.QueryHookOptions<GistsByUsernameQuery, GistsByUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GistsByUsernameQuery, GistsByUsernameQueryVariables>(GistsByUsernameDocument, options);
      }
export function useGistsByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GistsByUsernameQuery, GistsByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GistsByUsernameQuery, GistsByUsernameQueryVariables>(GistsByUsernameDocument, options);
        }
export type GistsByUsernameQueryHookResult = ReturnType<typeof useGistsByUsernameQuery>;
export type GistsByUsernameLazyQueryHookResult = ReturnType<typeof useGistsByUsernameLazyQuery>;
export type GistsByUsernameQueryResult = Apollo.QueryResult<GistsByUsernameQuery, GistsByUsernameQueryVariables>;