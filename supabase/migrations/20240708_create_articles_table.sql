-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  cover_url text,
  thumbnail_url text,
  category text,
  tags text[],
  author_name text,
  author_id uuid REFERENCES users(id) ON DELETE SET NULL,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Auto timestamp on update
CREATE OR REPLACE FUNCTION handle_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'set_articles_updated_at'
  ) THEN
    CREATE TRIGGER set_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE PROCEDURE handle_articles_updated_at();
  END IF;
END;
$$;

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE articles;
