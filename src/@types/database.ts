export interface Registration {
  id?: string;
  created_at?: string;
  payment_number: string;
  full_name: string;
  document: string;
  email: string;
  phone: string;
  protocol_number: string;
  file_path?: string;
}

export interface Review {
  jurado: string;
  nota: number;
  recomendacao: string;
  comentario: string;
  submittedAt: string;
  scores: Record<string, number>;
}

export interface ConflictDetails {
  id: string;
  name: string;
  protocol: string;
  status: string;
  title: string;
  summary: string;
  documentUrl: string;
  reviews: Review[];
}

export interface Criterion {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
}
