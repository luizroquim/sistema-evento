import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import * as S from './styles';


export type ButtonVariant = 'primary' | 'secondary' | 'ghost';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, variant = 'primary', ...rest }, ref) => {
    return (
      <S.StyledButton 
        ref={ref}          
        disabled={isLoading} 
        $variant={variant} 
        {...rest}
      >
        {isLoading ? 'Enviando arquivos...' : children}
      </S.StyledButton>
    );
  }
);

Button.displayName = 'Button';