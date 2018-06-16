import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Search from "./Search"
import UploadArea from "./UploadArea";
import {Button} from "@material-ui/core/es/index";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 200,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.0,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '0px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        margin: "0%",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        borderColor: 'black',
        border: 'solid',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.3,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        //backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
    button: {
        marginTop: theme.spacing.unit,
    },
});


const images = [
    {
        url: 'http://localhost:3001/static/media/dummy0.5c8d5aa3.jpg',
        title: '1',
        width: '100%'
    },
    {
        url: 'http://localhost:3001/static/media/dummy1.d7171ce0.jpg',
        title: '2',
        width: '100%',
    },
    {
        url: 'http://localhost:3001/static/media/dummy2.4338a1b8.jpg',
        title: '3',
        width: '100%',
    },
];

class SideMediums extends React.Component {

    render() {
        const {classes} = this.props;


        return (
            <div className={classes.root}>
                <UploadArea/>
                <Search/>

                {images.map(image => (
                    <ButtonBase
                        focusRipple
                        key={image.title}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: image.width,
                        }}
                        //onClick={() => { console.log(image.title); }}
                        onClick={() => {this.props.onClick(image.url);}}
                    >
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.url})`
                            }}
                        />
                        <span className={classes.imageBackdrop}/>
                        <span className={classes.imageButton}>
            <Typography
                component="span"
                variant="subheading"
                color="inherit"
                className={classes.imageTitle}
            >
              {/*{image.title}*/}
                <span className={classes.imageMarked}/>
            </Typography>
          </span>
                    </ButtonBase>
                ))}
                <Button variant="contained" className={classes.button} fullWidth>
                    More
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(SideMediums);
