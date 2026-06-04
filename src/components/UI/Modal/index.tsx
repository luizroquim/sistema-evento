import { useEffect } from "react";
import { X } from "lucide-react"; // Ícone de "X" para fechar
import { Button } from "../Button"; // Nosso botão customizado
import * as S from "./styles"; // Nossos estilos que faremos em seguida

interface ModalProps {
  isOpen: boolean; // some ou aparece
  onClose: () => void; // Fechar modal
  onConfirm: () => void; // Confirmação do envio
  title: string;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
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
          <button type="button" onClick={onClose} aria-label="Fechar modal">
            <X size={20} />
          </button>
        </S.Header>

        <S.Content>{children}</S.Content>

        <S.Footer>
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="button" onClick={onConfirm}>
            Confirmar e Enviar
          </Button>
        </S.Footer>
      </S.ModalContainer>
    </S.Overlay>
  );
}
