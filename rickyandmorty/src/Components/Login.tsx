import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Button,
  Container,
  TextField,
  Typography,
  Theme,
  Snackbar,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

interface LoginProps {
  onFormSwitch: (formName: string) => void;
}

interface LoginForm {
  email: string;
  password: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#2e4057',
    backgroundImage: 'radial-gradient(circle at 50% 50%, #81b29a, #2e4057)',
    borderRadius: '7px',
    marginTop: '10%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    border: '1px solid #fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  field: {
    marginBottom: '10px',
  },
  label: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
  },
  button: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#2e4057',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  },
  linkBtn: {
    background: 'none',
    color: '#000',
    textDecoration: 'underline',
    marginTop: '2%',
  },
}));

const Login: React.FC<LoginProps> = ({ onFormSwitch }) => {
  const navigate = useNavigate();
  const { handleSubmit, register ,formState: { errors }} = useForm<LoginForm>();
  const classes = useStyles();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleToastClose = () => {
    setOpenToast(false);
  };

  const onSubmit = handleSubmit((data: LoginForm) => {
    const { email, password } = data;

    const emailRegex = /[^\s@]+$/;
    const passwordRegex = /[a-z]/;

    if (!emailRegex.test(email)) {
      setToastMessage('Please enter a valid email address.');
      setOpenToast(true);
      return;
    }

    if (!passwordRegex.test(password)) {
      setToastMessage(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
      );
      setOpenToast(true);
      return;
    }

    const storedUsers: { email: string; password: string }[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find(
      (storedUser) => storedUser.email === email && storedUser.password === password
    );
    if (user) {
      navigate('/characters');
    } else {
      setToastMessage('Invalid email or password.');
      setOpenToast(true);
    }
  });

  return (
    <Container className={classes.container}>
      <form onSubmit={onSubmit} className={classes.form}>
        <Typography variant="h1">Login</Typography>
        <div className={classes.field}>
          <label htmlFor="email" className={classes.label}>
            Email:
          </label>
          <TextField
            type="text"
            id="email"
            placeholder="youremail@gmail.com"
            className={classes.input}
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            error={!!errors.email}
            helperText={errors.email && 'Please enter a valid email'}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="password" className={classes.label}>
            Password:
          </label>
          <TextField
            type="password"
            id="password"
            className={classes.input}
           {...register('password', { required: true })}
            error={!!errors.password}
            helperText={errors.password && 'Please enter your password'}
          />
        </div>
        <Button type="submit" variant="contained" className={classes.button}>
          Login
        </Button>
      </form>
      <Button className={classes.linkBtn} onClick={() => onFormSwitch('register')}>
        Don't have an account? Register here.
      </Button>
      <Snackbar
        open={openToast}
        autoHideDuration={4000}
        onClose={handleToastClose}
        message={toastMessage}
      />
    </Container>
  );
};

export default Login;
