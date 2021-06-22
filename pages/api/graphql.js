// https://github.com/MileTwo/nextjs-typescript-material-ui-eslint-jest/blob/prisma-graphql/pages/api/graphql.ts
import { ApolloServer, gql } from 'apollo-server-micro';
import prisma from '../../prisma/prisma';
import Github from '../../services/Github';

// overrides default REST endpoint checking for Next.js (allows for graphql playground to render a UI)
export const config = {
    api: {
        bodyParser: false,
    },
};

const typeDefs = gql`
    type Query {
        gistsByUsername(username: String!): [Gist]
        gistsById(id: String!): Gist
        favoritedGistById(id: String!): Favorite
        favorites: [Favorite!]
    }

    type Mutation {
        favoriteGist(gistId: String!, favorited: Boolean): Favorite
    }

    type Favorite {
        gistId: String!
        favorited: Boolean!
    }

    type Gist {
        url: String!
        id: String!
        created_at: String!
        updated_at: String!
        forks_url: String!
        commits_url: String!
        node_id: String!
        git_pull_url: String!
        git_push_url: String!
        html_url: String!
        public: Boolean
        description: String!
        comments: Int
        user: String
        comments_url: String
        owner: Owner
        truncated: Boolean
        files: [File]
    }

    type Owner {
        login: String
        id: Int
        node_id: String
        avatar_url: String
        gravatar_id: String
        url: String
        html_url: String
        followers_url: String
        following_url: String
        gists_url: String
        starred_url: String
        subscriptions_url: String
        organizations_url: String
        repos_url: String
        events_url: String
        received_events_url: String
        type: String
        site_admin: Boolean
    }

    type File {
        filename: String!
        type: String
        language: String
        raw_url: String
        size: Int
    }
`;

const resolvers = {
    Query: {
        gistsByUsername: (_, { username }, { dataSources }) =>
            dataSources.githubAPI.getGistsByUser(`${username}`.toLowerCase()),
        gistsById: (_, { id }, { dataSources }) => dataSources.githubAPI.getGistById(id),
        favoritedGistById: async (_, { id }) => {
            const gist = await prisma().favorite.findUnique({ where: { gistId: id } });
            return gist;
        },
        favorites: async (_, { id }) => {
            const favorites = await prisma().favorite.findMany({ where: { favorited: true } });
            return favorites;
        },
    },
    Mutation: {
        favoriteGist: async (_, { gistId, favorited }, { dataSources }) => {
            // update or insert into db
            const gist = await prisma().favorite.upsert({
                where: {
                    gistId,
                },
                create: {
                    gistId,
                    favorited,
                },
                update: {
                    favorited,
                },
            });

            return gist;
        },
    },
};

const apolloServer = new ApolloServer({
    resolvers,
    typeDefs,
    playground: true,
    context: () => ({ prisma: prisma() }),
    dataSources: () => ({
        githubAPI: new Github(),
    }),
});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export default handler;
