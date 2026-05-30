/*
  # Astrology App Initial Schema

  1. New Tables
    - `birth_charts`
      - `id` (uuid, primary key)
      - `name` (text, user's name)
      - `birth_date` (date)
      - `birth_time` (text, time of birth)
      - `birth_place` (text, place of birth)
      - `chart_data` (jsonb, contains planetary positions, houses, signs)
      - `language_preference` (text, default 'hinglish')
      - `created_at` (timestamp)
    
    - `questions`
      - `id` (uuid, primary key)
      - `chart_id` (uuid, foreign key to birth_charts)
      - `question` (text)
      - `answer` (text, AI generated answer)
      - `language` (text, response language)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Allow public insert and read for one-time users
    - No authentication required
*/

-- Create birth_charts table
CREATE TABLE IF NOT EXISTS birth_charts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  birth_date date NOT NULL,
  birth_time text NOT NULL,
  birth_place text NOT NULL,
  chart_data jsonb DEFAULT '{}'::jsonb,
  language_preference text DEFAULT 'hinglish' CHECK (language_preference IN ('hindi', 'english', 'hinglish')),
  created_at timestamptz DEFAULT now()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chart_id uuid NOT NULL REFERENCES birth_charts(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text,
  language text DEFAULT 'hinglish' CHECK (language IN ('hindi', 'english', 'hinglish')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE birth_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no auth required)
CREATE POLICY "Public can insert birth charts"
  ON birth_charts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can read birth charts"
  ON birth_charts FOR SELECT
  USING (true);

CREATE POLICY "Public can insert questions"
  ON questions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can read questions"
  ON questions FOR SELECT
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_questions_chart_id ON questions(chart_id);
CREATE INDEX IF NOT EXISTS idx_birth_charts_created_at ON birth_charts(created_at);