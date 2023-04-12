import classes from './Button.module.css';

interface ButtonProps {
  children: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className={classes.button}>
      {props.children}
    </button>
  );
};

export default Button;
