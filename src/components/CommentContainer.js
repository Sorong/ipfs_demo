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

class CommentContainer extends React.Component{

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.props.comments.map(data => (
                    <Comment className={classes.snackbar} key={data.id} message={data.text}/>
                ))}
                <TextInput onClick={this.props.onClick}/>
            </div>
        )
    }
}

CommentContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentContainer);
