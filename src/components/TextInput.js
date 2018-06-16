import React from "react";
import {Button, TextField} from "@material-ui/core/es/index";
import {withStyles} from "@material-ui/core/styles/index";
import Add from "@material-ui/icons/es/Add";
import Chat from "@material-ui/icons/es/Chat";

const styles = {
    button: {},
    text: {
        color: "white !important",
    }
};


class TextInput extends React.Component {
    constructor(props) {
        super(props);
    }
    getType() {
        if(this.props.type === "add") {
            return (<Add/>)
        }
        return (<Chat/>)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField
                    className={classes.text}
                    //value={this.state.name}
                    //value={this.state.tag}
                    //onChange={this.handleChange('tag')}
                    //margin="normal"
                    multiline={this.props.type !== "add"}
                    style = {{width: "80%"}}
                />
                <Button variant="fab" className={classes.button} onClick={() => { console.log("hi"); }}  style = {{maxWidth: "20%"}} mini>
                    {this.getType()}
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(TextInput);