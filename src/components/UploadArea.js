import React from "react";
import Dropzone from 'react-dropzone'
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: theme.mixins.gutters({
        marginTop: theme.spacing.unit,
        display: "inline-block",
    }),
    dropzone: {
        marginTop: theme.spacing.unit,
        width:"100%",
        border: "dotted"
    }
});

class UploadArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = { files: [] }
    }

    onDrop(files) {
        this.setState({
            files
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <section>
                <div className={classes.root}>
                    <Dropzone onDrop={this.onDrop.bind(this)} className={classes.dropzone}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <aside>
                    <ul>
                        {
                            this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                        }
                    </ul>
                </aside>
            </section>
        );
    }
}

export default withStyles(styles)(UploadArea);