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
