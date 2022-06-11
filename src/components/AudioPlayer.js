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
  closePlayer, goToNextSong, goToPreviousSong, shuffleSongs,
} from '../redux/features/musics/musicSlice';
import style from './AudioPlayer.module.css';

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const {
    currentSongPlaying: { previewUrl, trackName },
    songIndex, songsToBePlayed, showPlayer,
  } = useSelector((state) => state.music);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const repeatRef = useRef();
  const playingRef = useRef(false);

  useEffect(() => {
    if (!Number.isNaN(audioPlayer.current.duration)) {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);

      progressBar.current.max = seconds;
    }
  },
  [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const reloadPlayer = () => {
    progressBar.current.style.setProperty('--seek-before-width', '0%');
    progressBar.current.value = 0;
    setCurrentTime(progressBar.current.value);

    if (playingRef.current) {
      const temp = songIndex === 0 || songIndex === songsToBePlayed.length - 1;

      if (temp) audioPlayer.current.load();

      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.load();
    }
  };

  const changeSong = async (action) => {
    if (!playingRef.current) {
      setIsPlaying(!isPlaying);
      playingRef.current = !playingRef.current;
    }

    cancelAnimationFrame(animationRef.current);
    await new Promise((resolve) => resolve(dispatch(action())));
    reloadPlayer();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`,
    );

    setCurrentTime(progressBar.current.value);
  };

  const verifyIfRepeat = () => {
    if (repeatRef.current) {
      reloadPlayer();
      cancelAnimationFrame(animationRef.current);
    } else {
      changeSong(goToNextSong);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);

    const time = Math.floor(audioPlayer.current.currentTime);
    if (time === duration) verifyIfRepeat();
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);

    if (!playingRef.current) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }

    playingRef.current = !playingRef.current;
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const closeAudioPlayer = async () => {
    await new Promise((resolve) => resolve(dispatch(closePlayer())));
    playingRef.current = false;

    reloadPlayer();
  };

  const calcTime = (secs) => {
    const SECONDS = 60;
    const ABOVE_TEN = 10;

    const minutes = Math.floor(secs / SECONDS);
    const returnedMinutes = minutes < ABOVE_TEN ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % SECONDS);
    const returnedSeconds = seconds < ABOVE_TEN ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const handleCheckBox = (e) => {
    const { target: { name } } = e;
    if (name === 'repeat') {
      repeatRef.current = e.target.checked;
    } else if (name === 'shuffle') {
      dispatch(shuffleSongs());
    }
  };

  return (
    <Slide direction="up" in={ showPlayer }>
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
            inputProps={ { name: 'shuffle' } }
            icon={ <ShuffleIcon /> }
            checkedIcon={ <ShuffleOnIcon /> }
            onChange={ handleCheckBox }
          />
          <IconButton
            name="previous"
            onClick={ () => changeSong(goToPreviousSong) }
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
              playingRef.current
                ? <PauseIcon />
                : <PlayArrowIcon />
            }
          </Button>
          <IconButton
            name="next"
            onClick={ () => changeSong(goToNextSong) }
          >
            <SkipNextIcon />
          </IconButton>
          <Checkbox
            color="secondary"
            inputProps={ { name: 'repeat' } }
            icon={ <RepeatIcon /> }
            checkedIcon={ <RepeatOnIcon /> }
            onChange={ handleCheckBox }
          />
          <IconButton
            name="close"
            sx={ {
              transform: 'translate(90px, -12px)',
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
