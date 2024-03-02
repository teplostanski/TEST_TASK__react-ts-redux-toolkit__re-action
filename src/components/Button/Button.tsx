import { ReactNode, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={cn(styles.button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
