import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import TextInput from "./TextInput";

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class ChipsArray extends React.Component {
    state = {
        chipData: [
            { key: 0, label: 'Tag0' },
            { key: 1, label: 'Tag1' },
            { key: 2, label: 'Tag2' },
            { key: 3, label: 'Tag3' },
            { key: 4, label: 'Tag4' },
        ],
    };

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                {this.state.chipData.map(data => {
                    let avatar = null;

                    if (data.label === 'React') {
                        avatar = (
                            <Avatar>
                                <TagFacesIcon className={classes.svgIcon} />
                            </Avatar>
                        );
                    }

                    return (
                        <Chip
                            key={data.key}
                            avatar={avatar}
                            label={data.label}
                            //onClick={this.handleDelete(data)}
                            className={classes.chip}
                        />
                    );
                })}
                <TextInput type="add"/>
            </Paper>
        );
    }
}

ChipsArray.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);