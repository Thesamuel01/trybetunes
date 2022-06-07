import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Button, Checkbox, IconButton, Slide, Typography } from '@mui/material';
import {
  closePlayer,
  goToNextSong,
  goToPreviousSong,
  playMusic,
} from '../redux/features/musics/musicSlice';
import style from './AudioPlayer.module.css';

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const {
    currentSongPlaying: { previewUrl, trackName },
    songIndex, musics, isPlaying, startPlaying,
  } = useSelector((state) => state.music);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    if (!Number.isNaN(audioPlayer.current.duration)) {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);

      progressBar.current.max = seconds;
    }
  },
  [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calcTime = (secs) => {
    const SECONDS = 60;
    const ABOVE_TEN = 10;

    const minutes = Math.floor(secs / SECONDS);
    const returnedMinutes = minutes < ABOVE_TEN ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % SECONDS);
    const returnedSeconds = seconds < ABOVE_TEN ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const resetPlayer = () => {
    progressBar.current.style.setProperty('--seek-before-width', '0%');
    progressBar.current.value = 0;
    setCurrentTime(progressBar.current.value);

    if (songIndex === 0 || songIndex === musics.length - 1) {
      audioPlayer.current.load();
    }
  };

  const dispatchSomenthing = (action) => new Promise((resolve) => {
    dispatch(action());
    resolve();
  });

  const previousSong = async () => {
    cancelAnimationFrame(animationRef.current);
    await dispatchSomenthing(goToPreviousSong);
    resetPlayer();

    audioPlayer.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying);

    if (!isPlaying) dispatch(playMusic(!isPlaying));
  };

  const nextSong = async () => {
    cancelAnimationFrame(animationRef.current);
    await dispatchSomenthing(goToNextSong);
    resetPlayer();

    audioPlayer.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying);

    if (!isPlaying) dispatch(playMusic(!isPlaying));
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`,
    );

    setCurrentTime(progressBar.current.value);
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);

    if (Math.floor(audioPlayer.current.currentTime) === duration) {
      nextSong();
    }
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;

    dispatch(playMusic(!prevValue));

    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const closeAudioPlayer = () => {
    resetPlayer();
    dispatch(closePlayer());
  };

  return (
    <Slide direction="up" in={ startPlaying }>
      <Box
        hidden
        component="div"
        color="audioBg"
        sx={ {
          display: 'flex',
          bgcolor: 'background.default',
          border: '1px solid black',
          flexFlow: 'column wrap',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '500px',
          position: 'fixed',
          top: 'calc(100vh - 120px)',
          zIndex: 100,
          left: 'calc((100vw / 2) - 250px)',
          '@media (max-Width: 539px)': {
            left: 'calc((100vw / 2) - (100% / 2))',
          },
        } }
      >
        <audio
          ref={ audioPlayer }
          src={ previewUrl }
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <Box
          sx={ {
            textAlign: 'center',
            minWidth: '300px',
            transform: 'translate(24px, 0px)',
          } }
        >
          <Checkbox
            color="secondary"
            // id={ `${trackId}` }
            inputProps={ { name: 'favorite' } }
            icon={ <ShuffleIcon /> }
            checkedIcon={ <ShuffleOnIcon /> }
            // checked={ checkedInputs.some((id) => id === trackId) }
            // onChange={ handleCheckbox }
          />
          <IconButton
            name="previous"
            onClick={ previousSong }
          >
            <SkipPreviousIcon />
          </IconButton>
          <Button
            color="secondary"
            variant="contained"
            onClick={ togglePlayPause }
            sx={ {
              borderRadius: '50%;',
              width: '64px',
              height: '64px',
              transform: 'translate(0px, -35px)',
            } }
          >
            {
              isPlaying
                ? <PauseIcon />
                : <PlayArrowIcon />
            }
          </Button>
          <IconButton
            name="next"
            onClick={ nextSong }
          >
            <SkipNextIcon />
          </IconButton>
          <Checkbox
            color="secondary"
            // id={ `${trackId}` }
            inputProps={ { name: 'favorite' } }
            icon={ <RepeatIcon /> }
            checkedIcon={ <RepeatOnIcon /> }
            // checked={ checkedInputs.some((id) => id === trackId) }
            // onChange={ handleCheckbox }
          />
          <IconButton
            name="close"
            sx={ {
              transform: 'translate(96px, -20px)',
            } }
            onClick={ closeAudioPlayer }
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Typography
          gutterBottom
          variant="body"
        >
          { trackName }
        </Typography>
        <div className={ style.sliderContainer }>
          <div
            className={ `${style.currentTime} ${style.time}` }
          >
            {calcTime(currentTime)}
          </div>
          <div className={ style.slider }>
            <input
              className={ style.progressBar }
              type="range"
              defaultValue="0"
              ref={ progressBar }
              onChange={ changeRange }
            />
          </div>
          <div
            className={ `${style.duration} ${style.time}` }
          >
            {calcTime(duration)}
          </div>
        </div>
      </Box>
    </Slide>
  );
};

export default AudioPlayer;
