// Transforma "12345678900" em "123.456.789-00"
export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é número
    .replace(/(\d{3})(\d)/, '$1.$2') // Ponto após o 3º número
    .replace(/(\d{3})(\d)/, '$1.$2') // Ponto após o 6º número
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Traço após o 9º número
};

// Transforma "35999998888" em "(35) 99999-8888"
export const phoneMask = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é número
    .replace(/(\d{2})(\d)/, '($1) $2') // Parênteses no DDD
    .replace(/(\d{5})(\d{4})$/, '$1-$2'); // Traço no número do celular
};