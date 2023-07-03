import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../store/charactersSlice';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, TextField, Grid, LinearProgress, AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchCharacterById } from '../store/characterDetailSlice'

enum CharactersLife {
  ALIVE = 'Alive'
}
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    position: 'relative',
    marginTop: '64px',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
      marginTop: '56px',
    },
  },
  search: {
    marginLeft: 'auto',
    color: '#fff',
  },
  card: {
    display: 'flex',
    height: '100%',
  },
  media: {
    width: '50%',
    height: '100%',
    objectFit: 'cover',
    minHeight: '150px',
    minWidth: '150px',
  },
  content: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#fafafa',
  },
  statusIcon: {
    marginRight: 8,
    fontSize: 20
  },
  location: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: theme.spacing(1),
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  appBar: {
    backgroundColor: '#30414f',
    position: 'fixed',
    top: 0,
  },
}));

const Characters: React.FC = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const characters = useSelector((state: { characters: { characters: any; loading: boolean; error: string } }) => state.characters.characters);
  const loading = useSelector((state: { characters: { characters: any; loading: boolean; error: string } }) => state.characters.loading);
  const error = useSelector((state: { characters: { characters: any; loading: boolean; error: string } }) => state.characters.error);
  const [searchQuery, setSearchQuery] = useState('');
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const filteredCharacters = characters.filter((character: any) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleCardClick = (characterId: number) => {
    dispatch(fetchCharacterById(characterId));
    Navigate(`/characters/${characterId}`);
  };
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Rick and Morty
          </Typography>
          <TextField
            className={classes.search}
            label="Search by character name"
            variant="outlined"
            value={searchQuery}
            InputLabelProps={{
              style: { color: 'white' }
            }}
            onChange={handleSearchInputChange} />
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        {loading && <LinearProgress className={classes.progress} />}
        {error && <div>Error: {error}</div>}
        <Grid container spacing={2}>
          {filteredCharacters.map((character: any) => (
            <Grid key={character.id} item xs={12} sm={6} md={4} lg={3}>
              <Link to={`/characters/${character.id}`} style={{ textDecoration: 'none' }} onClick={() => handleCardClick(character.id)}>
                <Card className={classes.card}>
                  <CardMedia className={classes.media} image={character.image} title={character.name} />
                  <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {character.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <span className={classes.statusIcon} style={{
                        color: character.status === CharactersLife.ALIVE ? 'green' : character.status === 'Dead' ? 'red' : 'yellow'
                      }}>●</span>
                      <span style={{
                        fontWeight: 'bold'
                      }}>{character.status}</span>
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.location}>
                      <span style={{ fontWeight: 'bold' }}>Last Location:</span><br />
                      {character.location.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div></>
  );
};

export default Characters;
