/*
  # Initial Schema Setup for ConnectHub

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, matches auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `cover_image_url` (text)
      - `bio` (text)
      - `tags` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `social_links`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `platform` (text)
      - `url` (text)
      - `username` (text)
      - `created_at` (timestamp)
    
    - `collections`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `cover_image_url` (text)
      - `created_by` (uuid, references profiles)
      - `is_public` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `collection_members`
      - `collection_id` (uuid, references collections)
      - `profile_id` (uuid, references profiles)
      - `added_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  cover_image_url text,
  bio text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create social_links table
CREATE TABLE social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL,
  url text NOT NULL,
  username text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public social links are viewable by everyone"
  ON social_links FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own social links"
  ON social_links FOR ALL
  USING (auth.uid() = profile_id);

-- Create collections table
CREATE TABLE collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  cover_image_url text,
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public collections are viewable by everyone"
  ON collections FOR SELECT
  USING (is_public OR auth.uid() = created_by);

CREATE POLICY "Users can manage own collections"
  ON collections FOR ALL
  USING (auth.uid() = created_by);

-- Create collection_members table
CREATE TABLE collection_members (
  collection_id uuid REFERENCES collections(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  added_at timestamptz DEFAULT now(),
  PRIMARY KEY (collection_id, profile_id)
);

ALTER TABLE collection_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Collection members are viewable by everyone"
  ON collection_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM collections c
      WHERE c.id = collection_id
      AND (c.is_public OR auth.uid() = c.created_by)
    )
  );

CREATE POLICY "Collection owners can manage members"
  ON collection_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM collections c
      WHERE c.id = collection_id
      AND auth.uid() = c.created_by
    )
  );

-- Create function to handle profile updates
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();