import React, { useState } from 'react';
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

interface RegisterProps {
  onFormSwitch: (form: string) => void;
}

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    margin: 'auto',
    width: '20%',
    padding: '20px',
    backgroundColor: '#2e4057',
    backgroundImage: 'radial-gradient(circle at 50% 50%, #81b29a, #2e4057)',
    borderRadius: '7px',
    marginTop: '5%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    border: '1px solid #fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  label: {
    fontWeight: 'bold',
    color: '#fff',
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



const Register: React.FC<RegisterProps> = ({ onFormSwitch }) => {
  const { handleSubmit, register ,formState: { errors }} = useForm<RegisterForm>();
  const classes = useStyles();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleToastClose = () => {
    setOpenToast(false);
  };

  const onSubmit = handleSubmit((data: RegisterForm) => {
    const { username, email, password } = data;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

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

    if (password !== data.confirmPassword) {
      setToastMessage('Password and Confirm Password do not match.');
      setOpenToast(true);
      return;
    }

    const user = {
      email: email,
      password: password,
      username: username,
    };

    let users: { email: string; password: string; username: string }[] =
      JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find((u) => u.email === user.email);
    if (existingUser) {
      setToastMessage('This email has already been registered.');
      setOpenToast(true);
      return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    setToastMessage('Registration successful.');
    setOpenToast(true);
    onFormSwitch('login');
  });

  return (
    <Container className={classes.container}>
      <form onSubmit={onSubmit} className={classes.form}>
        <Typography variant="h1">Register</Typography>
        <div className="ui divider"></div>
        <div className={classes.field}>
          <label htmlFor="username" className={classes.label}>
            Username:
          </label>
          <TextField
            type="text"
            id="username"
            placeholder="username"
            className={classes.input}
            {...register('username', { required: true })}
            error={!!errors.username}
            helperText={errors.username && 'Please enter your username'}
          />
        </div>
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
            placeholder="Password"
            className={classes.input}
            {...register('password', { required: true })}
            error={!!errors.password}
            helperText={errors.password && 'Please enter your password'}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="confirmPassword" className={classes.label}>
            Confirm Password:
          </label>
          <TextField
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className={classes.input}
            {...register('confirmPassword', { required: true })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword && 'Please confirm your password'}
          />
        </div>
        <Button type="submit" variant="contained" className={classes.button}>
          Register
        </Button>
      </form>
      <Button className={classes.linkBtn} onClick={() => onFormSwitch('login')}>
        Already have an account? Login here.
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

export default Register;