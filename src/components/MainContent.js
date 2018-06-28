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
import MainMedium from "./MainMedium";
import ImageButtons from "./SideMediums";
import Tags from "./Tags";
import CommentContainer from "./CommentContainer";
import Database from "../logic/Database";
import MediumService from "../logic/MediumService";
import CommentService from "../logic/CommentService";
import TagService from "../logic/TagService";

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
        [theme.breakpoints.up('md')]: {
            position: 'sticky',
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
    commentService = new CommentService(this.database);
    tagService = new TagService(this.database);
    //'http://localhost:3001/static/media/dummy1.d7171ce0.jpg';

    constructor(props) {
        super(props);
        let images = this.mediumService.getMediumList();
        let tags = this.tagService.getTags(images[0].path);
        let comments = this.commentService.getComments(images[0].tag);
        this.state = {
            images: images,
            medium: images[0],
            comments: comments,
            tags: tags,
            mobileOpen: false
        };
        this.changeMainImage = this.changeMainImage.bind(this);
    }

    handleClick = (item) => {
        this.changeMainImage(item);
    };

    changeMainImage(path) {
        this.setState(() => ({
            medium : path,
            type : "image"
        }));
    }

    changeSideMediums(images) {
        this.setState(() => ({

        }))
    }


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
                        <div>
                            <div className={this.props.classes.toolbar}/>
                            <ImageButtons images={this.state.images} onClick={this.handleClick}/>
                        </div>
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
                    <MainMedium medium={this.state.medium} type={this.state.type}/>
                    <Tags/>
                    <CommentContainer/>
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