import { GetServerSideProps } from 'next';
import { makeStyles, createStyles, Typography, Theme, List, Grid, TextField } from '@material-ui/core';
import Layout from '../components/layout';
import ListItem, { Link } from '../components/list/ListItem';
import debounce from 'lodash.debounce';
import { gql } from '@apollo/client';

import React, { useCallback } from 'react';
import { tools } from '../lib/tools';
import { useGistsByUsernameLazyQuery } from '../gen/graphql-types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            minWidth: theme.breakpoints.values.sm,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                minWidth: 100,
            },
        },
        root: {
            padding: '2em',
        },
        linkButton: {
            marginLeft: '1em',
        },
    })
);

export type Image = { src: string; width: number; height: number };
interface Props {
    tools: { name: string; image?: Image }[];
}

const queryGistsByUsername = gql`
    query GistsByUsername($username: String!) {
        gistsByUsername(username: $username) {
            id
            description
            created_at
            updated_at
        }
    }
`;

export default function Home({ tools }: Props) {
    const classes = useStyles();

    const [loadGists, { data }] = useGistsByUsernameLazyQuery();

    const changeHandler = async (event: { target: { value: any } }) => {
        loadGists({ variables: { username: event.target.value } });
    };

    // quick debounce example https://dmitripavlutin.com/react-throttle-debounce/
    const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

    console.log({ data });

    return (
        <>
            <Layout title="Next.js example">
                <Grid container spacing={4} direction="column" className={classes.root}>
                    <Grid item container spacing={4} direction="column" xs={12} alignItems="center">
                        <Grid container item alignContent="stretch" justify="center" direction="column">
                            <Typography variant="h5" component="h2">
                                Github Gists
                            </Typography>

                            <TextField
                                id="outlined-basic"
                                label="Search for github username"
                                placeholder="keonik"
                                variant="outlined"
                                onChange={debouncedChangeHandler}
                            />
                        </Grid>
                        <Grid item container justify="center">
                            <List aria-label={tools.join(', ')} className={classes.list}>
                                {data?.gistsByUsername?.map((gist) => {
                                    if (gist) {
                                        return <ListItem key={gist.id} {...gist} />;
                                    }
                                    return '';
                                })}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Layout>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    return {
        props: {
            tools: tools.map(({ name, image }) => ({
                name,
                image,
            })),
        },
    };
};
