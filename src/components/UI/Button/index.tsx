import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import * as S from './styles';

// Variantes limpas, exatamente como você pediu
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
  icon?: ReactNode;       // <-- Suporte para receber os ícones do Lucide
  fullWidth?: boolean;    // <-- Propriedade mágica para alinhar nas tabelas
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, variant = 'primary', icon, fullWidth = false, ...rest }, ref) => {
    return (
      <S.StyledButton 
        ref={ref}          
        disabled={isLoading || rest.disabled} 
        $variant={variant} 
        $fullWidth={fullWidth} // <-- Passando a largura para o styled-components
        {...rest}
      >
        {isLoading ? (
          'Enviando...'
        ) : (
          <>
            {/* Renderiza o ícone com a classe de alinhamento se ele existir */}
            {icon && <span className="button-icon">{icon}</span>}
            {children}
          </>
        )}
      </S.StyledButton>
    );
  }
);

Button.displayName = 'Button';