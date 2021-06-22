import {
    ListItem as MUIListItem,
    ListItemText,
    Grid,
    Typography,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core';
import Link from '../link/Link';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        info: {
            justify: 'center',
            padding: theme.spacing(2),
        },
        avatar: {
            backgroundColor: theme.palette.gray.light,
        },
    })
);

export type Link = {
    label: string;
    href: string;
    as?: string;
};

type Props = {
    id: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export default function ListItem({ id, description, created_at, updated_at }: Props) {
    const classes = useStyles();
    const link = { href: '/gist/[id]', as: `/gist/${id}`, label: 'Learn More' };
    return (
        <MUIListItem divider>
            <Grid container alignItems="center">
                <ListItemText>
                    <Typography variant="body1">
                        <strong>Description:</strong>
                        {description}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Created:</strong>
                        {dayjs(created_at).format('MMM DD, YYYY')}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Last Updated:</strong>
                        {dayjs(updated_at).format('MMM DD, YYYY')}
                    </Typography>
                </ListItemText>
                <Grid container item xs={12} md={3} className={classes.info} justify="flex-end" alignItems="center">
                    <Link {...link} />
                </Grid>
            </Grid>
        </MUIListItem>
    );
}
