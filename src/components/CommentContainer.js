import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextInput from "./TextInput";
import Comment from "./Comment";


const styles = theme => ({
    snackbar: {
        margin: theme.spacing.unit,
    },
});

function LongTextSnackbar(props) {
    const { classes } = props;


    return (
        <div>
            <Comment className={classes.snackbar} message="I love snacks."/>
            <Comment
                className={classes.snackbar}
                message={
                    'I love candy. I love cookies. I love cupcakes. \
                    I love cheesecake. I love chocolate.'
                }
            />
            <Comment
                className={classes.snackbar}
                message="I love candy. I love cookies. I love cupcakes."
            />
            <Comment
                className={classes.snackbar}
                message={
                    'I love candy. I love cookies. I love cupcakes. \
                    I love cheesecake. I love chocolate.....................................'
                }
            />
            <TextInput/>
        </div>
    );
}

LongTextSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LongTextSnackbar);
