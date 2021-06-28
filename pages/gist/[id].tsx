import { Button, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import { gql } from '@apollo/client';
import { useGistByIdQuery, useToggleFavoriteGistMutation } from '../../gen/graphql-types';
import { useRouter } from 'next/router';
import FileTable from '../../components/table/FileTable';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { FavoritesQuery } from '../favorites';

const useStyles = makeStyles((theme: Theme) => ({
    description: {
        maxWidth: '80ch',
    },
    root: {
        padding: '.5em 2em',
    },
    title: {
        paddingLeft: '1em',
        color: theme.palette.secondary.dark,
    },
}));

export const queryGistById = gql`
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

export const mutationFavorited = gql`
    mutation ToggleFavoriteGist($gistId: String!, $favorited: Boolean) {
        favoriteGist(gistId: $gistId, favorited: $favorited) {
            gistId
            favorited
        }
    }
`;

export default function Gist(): ReactElement {
    const router = useRouter();
    const classes = useStyles();

    const { data, error, refetch } = useGistByIdQuery({ variables: { id: `${router.query.id}` } });
    const [toggleFavorite, { loading }] = useToggleFavoriteGistMutation({
        refetchQueries: [{ query: FavoritesQuery }],
    });

    const handleFavoriteClick = async () => {
        const gistId = `${router.query.id}`;
        await toggleFavorite({ variables: { gistId, favorited: !data?.favoritedGistById?.favorited } });
        refetch({ id: gistId });
    };

    return (
        <>
            <Layout title={`Gist`}>
                <Grid container spacing={4} className={classes.root}>
                    <Grid item xs={10} container alignItems="center">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link href="/" passHref>
                                Home
                            </Link>
                            <Typography color="textPrimary">{data?.gistsById?.description}</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={2} container alignItems="center" justify="flex-end">
                        <IconButton aria-label="Favrite Gist" onClick={handleFavoriteClick} disabled={loading}>
                            {data?.favoritedGistById?.favorited ? <MdFavorite /> : <MdFavoriteBorder />}
                        </IconButton>
                    </Grid>
                    {error && (
                        <Typography variant="h6" component="h4" color="error">
                            {error.message}
                        </Typography>
                    )}
                    <Grid item xs={12} container justify="center" alignItems="center">
                        <FileTable
                            // @ts-ignore
                            files={data?.gistsById?.files || []}
                        />
                    </Grid>
                    <Grid item xs={12} container justify="center">
                        <Button variant="contained" href={data?.gistsById?.html_url} color="primary">
                            Visit gist
                        </Button>
                    </Grid>
                </Grid>
            </Layout>
        </>
    );
}
