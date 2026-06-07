import { forwardRef, ButtonHTMLAttributes } from 'react';
import * as S from './styles';

// Adicionamos 'status-pending' e 'status-revision'
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'status-pending' | 'status-revision';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, variant = 'primary', ...rest }, ref) => {
    return (
      <S.StyledButton 
        ref={ref}          
        disabled={isLoading || rest.disabled} 
        $variant={variant} 
        {...rest}
      >
        {isLoading ? 'Enviando...' : children}
      </S.StyledButton>
    );
  }
);

Button.displayName = 'Button';