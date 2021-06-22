import { Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Tool, tools } from '../../lib/tools';
import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import { gql } from '@apollo/client';
import { useGistByIdQuery } from '../../gen/graphql-types';
import { useRouter } from 'next/router';
import FileTable from '../../components/table/FileTable';

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

interface Props {
    tool?: Tool;
}

const queryGistById = gql`
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
        }
    }
`;

export default function Gist(): ReactElement {
    const router = useRouter();
    const classes = useStyles();

    const { data } = useGistByIdQuery({ variables: { id: `${router.query.id}` } });

    return (
        <>
            <Layout title={`Gist`}>
                <Grid container spacing={4} className={classes.root}>
                    <Grid item xs={12}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link href="/" passHref>
                                Home
                            </Link>
                            <Typography color="textPrimary">{data?.gistsById?.description}</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12} container justify="center" alignItems="center">
                        <FileTable files={data?.gistsById?.files} />
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
