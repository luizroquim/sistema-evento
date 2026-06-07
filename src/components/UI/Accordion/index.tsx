import { useState, memo, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as S from "./styles";

interface AccordionProps {
  title: ReactNode; // Aceita JSX como título
  children: ReactNode;
}

export const Accordion = memo(({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.Wrapper>
      <S.Header onClick={() => setIsOpen(!isOpen)}>
        {title}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </S.Header>
      <S.Content $isOpen={isOpen}>
        {children}
      </S.Content>
    </S.Wrapper>
  );
});