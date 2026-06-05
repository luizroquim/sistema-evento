import { forwardRef, useState, InputHTMLAttributes, useRef } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import { useTheme } from 'styled-components';
import * as S from './styles';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, error, id, ...rest }, ref) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const theme = useTheme();
    const localInputRef = useRef<HTMLInputElement | null>(null);

    // 1. Função padrão quando o usuário clica e seleciona o arquivo manualmente
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        setFileName(files[0].name);
      } else {
        setFileName(null);
      }

      if (rest.onChange) {
        rest.onChange(event);
      }
    };

    // 🔥 2. NOVO: Previne o navegador de abrir o arquivo quando ele é arrastado por cima
    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
    };

    // 🔥 3. NOVO: Captura o arquivo quando o usuário solta (Drop) ele na área
    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault(); // Impede o navegador de abrir o arquivo em uma nova aba
      
      const files = event.dataTransfer.files; // Pega os arquivos arrastados
      
      if (files && files.length > 0) {
        setFileName(files[0].name); // Atualiza o nome na tela

        // Injeta os arquivos arrastados direto na propriedade 'files' do nosso input escondido
        if (localInputRef.current) {
          localInputRef.current.files = files;

          // Dispara o onChange fake para o React Hook Form e o Yup validarem o arquivo arrastado
          if (rest.onChange) {
            const fakeEvent = {
              target: localInputRef.current
            } as React.ChangeEvent<HTMLInputElement>;
            rest.onChange(fakeEvent);
          }
        }
      }
    };

    const handleRemoveFile = (event: React.MouseEvent) => {
      event.preventDefault();
      setFileName(null);

      if (localInputRef.current) {
        localInputRef.current.value = '';
        if (rest.onChange) {
          const fakeEvent = {
            target: localInputRef.current
          } as React.ChangeEvent<HTMLInputElement>;
          rest.onChange(fakeEvent);
        }
      }
    };

    return (
      <S.Container>
        <S.Label htmlFor={id}>{label}</S.Label>
        
        {/* 🔥 Adicionamos as propriedades de Drag and Drop na label que envolve tudo */}
        <S.UploadArea 
          htmlFor={id}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {fileName ? (
            <CheckCircle2 size={28} color={theme.colors.success} />
          ) : (
            <UploadCloud size={28} color={theme.colors.placeholder} />
          )}
          
          <S.Text>
            {fileName ? (
              <>
                Arquivo selecionado: <S.FileNameSuccess>{fileName}</S.FileNameSuccess>
              </>
            ) : (
              <>
                <strong>Clique para fazer upload</strong> ou arraste o arquivo
              </>
            )}
          </S.Text>
          
          {fileName && (
            <S.RemoveButton 
              type="button" 
              onClick={handleRemoveFile}
              aria-label={`Remover o arquivo ${fileName}`}
            >
              Remover arquivo
            </S.RemoveButton>
          )}
          
          <input
            id={id}
            type="file"
            ref={(e) => {
              localInputRef.current = e;
              if (typeof ref === 'function') ref(e);
              else if (ref) ref.current = e;
            }}
            {...rest}
            onChange={handleFileChange}
          />
        </S.UploadArea>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.Container>
    );
  }
);

FileInput.displayName = 'FileInput';