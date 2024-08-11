import React from 'react';
import styles from '@/styles/Home.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className={styles.button} {...props}>
    {children}
  </button>
);

export default button;