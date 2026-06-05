import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../Button";
import * as S from "./styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  isLoading = false,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <h3>{title}</h3>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </S.Header>

        <S.Content>{children}</S.Content>

        <S.Footer>
          <Button
            variant="ghost"
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Confirmar e Enviar
          </Button>
        </S.Footer>
      </S.ModalContainer>
    </S.Overlay>
  );
}
