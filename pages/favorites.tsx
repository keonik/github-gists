import { gql } from '@apollo/client';
import { Grid, List, Typography, ListItem, Button } from '@material-ui/core';
import React, { ReactElement } from 'react';
import Layout from '../components/layout';
import { useFavoritesQuery } from '../gen/graphql-types';
import Link from 'next/link';

export const FavoritesQuery = gql`
    query Favorites {
        favorites {
            gistId
        }
    }
`;

export default function favorites(): ReactElement {
    const { data } = useFavoritesQuery();

    return (
        <Layout title="Github Gist Favorites">
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h2" component="h1">
                        Favorites
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <List>
                        {data?.favorites?.map((favorite) => (
                            <ListItem key={favorite.gistId}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>Gist Id{'   '}</strong>
                                        {favorite.gistId}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Link href={`/gist/${favorite.gistId}`}>
                                        <Button color="secondary" variant="contained">
                                            Learn more
                                        </Button>
                                    </Link>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Layout>
    );
}
