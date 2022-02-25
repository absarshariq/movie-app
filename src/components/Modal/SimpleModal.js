import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { img_300 } from '../../config/config';
import { Button } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Carousel from '../carousel/Carousel';
import './simpleModal.css'
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        
        width: '90%',
        height: '80%',
        backgroundColor: '#706b6b',
        // backgroundColor: '#ffff',
        color: 'white',
        border: '2px solid #000',
        borderRadius: 10,
        alignItems:'center',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 9, 9),
    },
}));

export default function SimpleModal({ children, media_type, id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState([]);
    const [video, setVideo] = useState();

    const fetchdata = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type == 'Movie' ? 'movie' : 'tv'}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setContent(data);
        // console.log(content.media_type);
        // setPage(data.total_pages);
        window.scroll(0, 0);
    }
    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type == 'Movie' ? 'movie' : 'tv'}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        if(data!=null)
            setVideo(data.results[0].key);
        window.scroll(0, 0);
    }

    // console.log(video);
    useEffect(() => {
        fetchdata();
        fetchVideo();
    }, [])

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div type="button" onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className='content__Modal'>
                            <img src={content.backdrop_path ? (img_300 + '/' + content.backdrop_path) : (img_300 + '/' + content.poster_path)} />
                            <h2 className="transition-modal-title">{content.original_title ? content.original_title : content.name}</h2>
                            <div className="titletagline">{content.tagline}</div>
                            <div className="transition-modal-description">r{content.overview}</div>
                            <div>
                                <Carousel media_type={media_type} id={id} />
                            </div>
                            <Button variant='contained'
                                startIcon={<YouTubeIcon />}
                                color="secondary"
                                target="__blank"
                                href={`https://www.youtube.com/watch?v=${video}`}
                            >
                                Watch Trailer
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    );
}
