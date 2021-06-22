import { makeStyles, createStyles, Typography, AppBar, Toolbar, Link as MUILink, Container } from '@material-ui/core';
import React, { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
const useStyles = makeStyles(() =>
    createStyles({
        header: {
            // padding: '1em 2em',
        },
        link: {
            paddingRight: '1em',
            cursor: 'pointer',
        },
    })
);

interface LayoutProps {
    children: ReactElement[] | ReactElement | string;
    title: string;
}

const Layout = ({ children, title }: LayoutProps): ReactElement => {
    const classes = useStyles();

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Link href="/" passHref>
                        <MUILink variant="h4" component="h1" className={classes.link}>
                            Github Gists
                        </MUILink>
                    </Link>
                    <Link href="/favorites" passHref>
                        <MUILink variant="h5" component="h2" className={classes.link}>
                            Favorites
                        </MUILink>
                    </Link>
                </Toolbar>
            </AppBar>
            <main>
                <Container maxWidth="md">{children}</Container>
            </main>
        </>
    );
};

export default Layout;
