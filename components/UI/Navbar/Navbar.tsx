import Button from '../Button/Button';
import classes from './Navbar.module.css';

const Navbar: React.FC = () => {
  return <div className={classes.container}>
    <Button>LOGIN</Button>
    <Button>REGISTER</Button>
  </div>;
};

export default Navbar;
