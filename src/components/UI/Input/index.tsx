import { forwardRef, InputHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";
import * as S from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...rest }, ref) => {
    return (
      <S.InputWrapper>
        {label && <S.Label htmlFor={id}>{label}</S.Label>}

        <S.StyledInput id={id} ref={ref} $hasError={!!error} {...rest} />

        {error && <S.ErrorMessage><AlertCircle size={14}/>{error}</S.ErrorMessage>}
      </S.InputWrapper>
    );
  },
);

Input.displayName = "Input";
