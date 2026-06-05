import { forwardRef, InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import * as S from './styles';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode; // Permite passar texto ou links HTML por dentro da label
  error?: string;
}


export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, ...rest }, ref) => {
    return (
      <S.CheckboxContainer>
        <S.LabelWrapper htmlFor={id}>
          <S.HiddenCheckbox 
            type="checkbox" 
            id={id} 
            ref={ref} 
            $hasError={!!error} 
            {...rest} 
          />
          
          <S.StyledCheckbox $hasError={!!error} />
          
          <S.LabelText>{label}</S.LabelText>
        </S.LabelWrapper>

        
        {error && (
          <S.ErrorMessage>
            <AlertCircle size={14} />
            {error}
          </S.ErrorMessage>
        )}
      </S.CheckboxContainer>
    );
  }
);

Checkbox.displayName = 'Checkbox';