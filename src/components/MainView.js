import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Medium from "./Medium";
import SideBar from "./SideBar";
import Tags from "./Tags";
import CommentContainer from "./CommentContainer";
import Database from "../logic/Database";
import MediumService from "../logic/MediumService";
import TagCommentService from "../logic/TagCommentService";

const drawerWidth = 250;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        //backgroundColor: "black",
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        height: "100%",
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});


class ResponsiveDrawer extends React.Component {
    database = new Database();
    mediumService = new MediumService(this.database);
    tagCommentService = new TagCommentService(this.database);
    state = {
        images : this.mediumService.getMediumList(),
    };
    //'http://localhost:3001/static/media/dummy1.d7171ce0.jpg';

    constructor(props) {
        super(props);
        let images = this.mediumService.getMediumList();
        let tags = this.tagCommentService.getTags(images[0].path);
        let comments = this.tagCommentService.getComments(images[0].tag);
        this.state = {
            images: images,
            medium: this.state.images[0],
            comments: comments,
            tags: tags,
            mobileOpen: false
        };
        this.changeMainImage = this.changeMainImage.bind(this);
        this.addComment = this.addComment.bind(this);
        this.addTag = this.addTag.bind(this);
    }

    mediumChanged = (item) => {
        this.changeMainImage(item);
    };

    uploadFile = (file) => {
        console.log(file)
      let medium = this.mediumService.putMedium(file);
      //this.changeMainImage(medium);
    };

    addTag = (tag) => {
        this.tagCommentService.putComment(this.state.medium.url, tag);
        this.state.tags.push({key: "", label: tag})
        this.setState({
            tags : this.state.tags
        })
    };

    addComment = (comment) => {
        this.tagCommentService.putComment(this.state.medium.url, comment);
        this.state.comments.push({text: comment})
        this.setState({
            comments : this.state.comments
        })
    };

    changeMainImage(medium) {
        this.setState(() => ({
            medium: medium,
            comments: this.tagCommentService.getComments(medium.url),
            tags: this.tagCommentService.getTags(medium.url),
        }));
    }

    changeSideMediums(images) {
        this.setState(() => ({}))
    }

    drawer = (
        <div>
            <div className={this.props.classes.toolbar}/>
            <SideBar images={this.state.images} onClick={this.mediumChanged} onDrop={this.uploadFile}/>
        </div>
    );


    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    render() {
        const {classes, theme} = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar height="100%">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            IPFS-Imagehoster
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {this.drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {this.drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Medium medium={this.state.medium}/>
                    <Tags tags={this.state.tags} onClick={this.addTag}/>
                    <CommentContainer comments={this.state.comments} onClick={this.addComment}/>
                </main>

            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default withStyles(styles, {withTheme: true})(ResponsiveDrawer);