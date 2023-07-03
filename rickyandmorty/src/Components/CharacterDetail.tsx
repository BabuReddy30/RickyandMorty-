import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacterById } from '../store/characterDetailSlice';
import { Typography, makeStyles, IconButton } from '@material-ui/core';
import { useParams, useNavigate  } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px)', // Subtract the height of the app bar
    padding: theme.spacing(4),
  },
  imageContainer: {
    width: '50%',
    marginRight: theme.spacing(4),
  },
  image: {
    width: '75%',
    height: '70%',
    objectFit: 'cover',
  },
  detailsContainer: {
    width: '50%',
  },
  details: {
    marginLeft: theme.spacing(2),
  },
  backButtonContainer: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1,
  },
}));



const CharacterDetail = () => {
  const dispatch = useDispatch();
  const characterDetails = useSelector((state: { characterDetail: { characterDetails: any; loading: boolean; error: string } }) => state.characterDetail.characterDetails);
  const loading = useSelector((state: { characterDetail: { characterDetails: any; loading: boolean; error: string } }) => state.characterDetail.loading);
  const error = useSelector((state: { characterDetail: { characterDetails: any; loading: boolean; error: string } }) => state.characterDetail.error);
  const navigate = useNavigate();
  const { id  } = useParams();

  useEffect(() => {
    dispatch(fetchCharacterById(id));
  }, [dispatch, id]);

  const classes = useStyles();

  const handleGoBack = () => {
    navigate('/characters');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.backButtonContainer}>
        <IconButton onClick={handleGoBack}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={characterDetails?.image} alt={characterDetails?.name} />
      </div>
      <div className={classes.detailsContainer}>
        <Typography variant="h3">{characterDetails?.name}</Typography>
        <Typography variant="body1">Status: {characterDetails?.status}</Typography>
        <Typography variant="body1">Location: {characterDetails?.location?.name}</Typography>
        <Typography variant="body1">Origin: {characterDetails?.origin?.name}</Typography>
        <Typography variant="body1">Species: {characterDetails?.species}</Typography>
        <Typography variant="body1">Gender: {characterDetails?.gender}</Typography>
      </div>
    </div>
  );
};

export default CharacterDetail;
