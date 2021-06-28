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

export type Favorite = {
  __typename?: 'Favorite';
  gistId: Scalars['String'];
  favorited: Scalars['Boolean'];
  gist?: Maybe<Gist>;
};

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
  favorite?: Maybe<Favorite>;
};

export type Mutation = {
  __typename?: 'Mutation';
  favoriteGist?: Maybe<Favorite>;
};


export type MutationFavoriteGistArgs = {
  gistId: Scalars['String'];
  favorited?: Maybe<Scalars['Boolean']>;
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
  favoritedGistById?: Maybe<Favorite>;
  favorites?: Maybe<Array<Favorite>>;
};


export type QueryGistsByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryGistsByIdArgs = {
  id: Scalars['String'];
};


export type QueryFavoritedGistByIdArgs = {
  id: Scalars['String'];
};


export type FavoritesQueryVariables = Exact<{ [key: string]: never; }>;


export type FavoritesQuery = (
  { __typename?: 'Query' }
  & { favorites?: Maybe<Array<(
    { __typename?: 'Favorite' }
    & Pick<Favorite, 'gistId'>
    & { gist?: Maybe<(
      { __typename?: 'Gist' }
      & Pick<Gist, 'created_at' | 'updated_at' | 'description' | 'html_url'>
    )> }
  )>> }
);

export type GistByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GistByIdQuery = (
  { __typename?: 'Query' }
  & { gistsById?: Maybe<(
    { __typename?: 'Gist' }
    & Pick<Gist, 'created_at' | 'updated_at' | 'description' | 'html_url'>
    & { files?: Maybe<Array<Maybe<(
      { __typename?: 'File' }
      & Pick<File, 'filename' | 'type' | 'language' | 'raw_url' | 'size'>
    )>>>, favorite?: Maybe<(
      { __typename?: 'Favorite' }
      & Pick<Favorite, 'gistId'>
    )> }
  )> }
);

export type ToggleFavoriteGistMutationVariables = Exact<{
  gistId: Scalars['String'];
  favorited?: Maybe<Scalars['Boolean']>;
}>;


export type ToggleFavoriteGistMutation = (
  { __typename?: 'Mutation' }
  & { favoriteGist?: Maybe<(
    { __typename?: 'Favorite' }
    & Pick<Favorite, 'gistId' | 'favorited'>
  )> }
);

export type GistsByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GistsByUsernameQuery = (
  { __typename?: 'Query' }
  & { gistsByUsername?: Maybe<Array<Maybe<(
    { __typename?: 'Gist' }
    & Pick<Gist, 'id' | 'description' | 'created_at' | 'updated_at'>
    & { favorite?: Maybe<(
      { __typename?: 'Favorite' }
      & Pick<Favorite, 'gistId'>
    )> }
  )>>> }
);


export const FavoritesDocument = gql`
    query Favorites {
  favorites {
    gistId
    gist {
      created_at
      updated_at
      description
      html_url
    }
  }
}
    `;

/**
 * __useFavoritesQuery__
 *
 * To run a query within a React component, call `useFavoritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoritesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFavoritesQuery(baseOptions?: Apollo.QueryHookOptions<FavoritesQuery, FavoritesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavoritesQuery, FavoritesQueryVariables>(FavoritesDocument, options);
      }
export function useFavoritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavoritesQuery, FavoritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavoritesQuery, FavoritesQueryVariables>(FavoritesDocument, options);
        }
export type FavoritesQueryHookResult = ReturnType<typeof useFavoritesQuery>;
export type FavoritesLazyQueryHookResult = ReturnType<typeof useFavoritesLazyQuery>;
export type FavoritesQueryResult = Apollo.QueryResult<FavoritesQuery, FavoritesQueryVariables>;
export const GistByIdDocument = gql`
    query GistById($id: String!) {
  gistsById(id: $id) {
    created_at
    updated_at
    description
    html_url
    files {
      filename
      type
      language
      raw_url
      size
    }
    favorite {
      gistId
    }
  }
}
    `;

/**
 * __useGistByIdQuery__
 *
 * To run a query within a React component, call `useGistByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGistByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGistByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGistByIdQuery(baseOptions: Apollo.QueryHookOptions<GistByIdQuery, GistByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GistByIdQuery, GistByIdQueryVariables>(GistByIdDocument, options);
      }
export function useGistByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GistByIdQuery, GistByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GistByIdQuery, GistByIdQueryVariables>(GistByIdDocument, options);
        }
export type GistByIdQueryHookResult = ReturnType<typeof useGistByIdQuery>;
export type GistByIdLazyQueryHookResult = ReturnType<typeof useGistByIdLazyQuery>;
export type GistByIdQueryResult = Apollo.QueryResult<GistByIdQuery, GistByIdQueryVariables>;
export const ToggleFavoriteGistDocument = gql`
    mutation ToggleFavoriteGist($gistId: String!, $favorited: Boolean) {
  favoriteGist(gistId: $gistId, favorited: $favorited) {
    gistId
    favorited
  }
}
    `;
export type ToggleFavoriteGistMutationFn = Apollo.MutationFunction<ToggleFavoriteGistMutation, ToggleFavoriteGistMutationVariables>;

/**
 * __useToggleFavoriteGistMutation__
 *
 * To run a mutation, you first call `useToggleFavoriteGistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavoriteGistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavoriteGistMutation, { data, loading, error }] = useToggleFavoriteGistMutation({
 *   variables: {
 *      gistId: // value for 'gistId'
 *      favorited: // value for 'favorited'
 *   },
 * });
 */
export function useToggleFavoriteGistMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFavoriteGistMutation, ToggleFavoriteGistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFavoriteGistMutation, ToggleFavoriteGistMutationVariables>(ToggleFavoriteGistDocument, options);
      }
export type ToggleFavoriteGistMutationHookResult = ReturnType<typeof useToggleFavoriteGistMutation>;
export type ToggleFavoriteGistMutationResult = Apollo.MutationResult<ToggleFavoriteGistMutation>;
export type ToggleFavoriteGistMutationOptions = Apollo.BaseMutationOptions<ToggleFavoriteGistMutation, ToggleFavoriteGistMutationVariables>;
export const GistsByUsernameDocument = gql`
    query GistsByUsername($username: String!) {
  gistsByUsername(username: $username) {
    id
    description
    created_at
    updated_at
    favorite {
      gistId
    }
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