-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  nom text,
  prenom text,
  telephone text,
  date_naissance date,
  adresse text,
  code_postal text,
  ville text,
  created_at timestamp DEFAULT now()
);

-- Create devis table
CREATE TABLE IF NOT EXISTS devis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type_assurance text NOT NULL,
  statut text DEFAULT 'en_attente',
  details jsonb,
  created_at timestamp DEFAULT now()
);

-- Create contrats table
CREATE TABLE IF NOT EXISTS contrats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  numero_contrat text UNIQUE NOT NULL,
  type text NOT NULL,
  date_debut date NOT NULL,
  date_fin date NOT NULL,
  montant decimal NOT NULL,
  statut text DEFAULT 'actif',
  created_at timestamp DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  nom text NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Create messages_chat table
CREATE TABLE IF NOT EXISTS messages_chat (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  message text NOT NULL,
  sender text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE users;
ALTER PUBLICATION supabase_realtime ADD TABLE devis;
ALTER PUBLICATION supabase_realtime ADD TABLE contrats;
ALTER PUBLICATION supabase_realtime ADD TABLE documents;
ALTER PUBLICATION supabase_realtime ADD TABLE messages_chat;