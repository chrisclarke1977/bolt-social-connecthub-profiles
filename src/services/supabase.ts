import { supabase } from '../lib/supabase';
import { User, Collection, SocialLink } from '../types';

// User Services
export async function getUsers() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select(`
      *,
      social_links (*)
    `);

  if (error) throw error;

  return profiles.map(transformProfileToUser);
}

export async function getUserById(id: string) {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select(`
      *,
      social_links (*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!profile) return null;

  return transformProfileToUser(profile);
}

// Collection Services
export async function getCollections() {
  const { data: collections, error } = await supabase
    .from('collections')
    .select(`
      *,
      collection_members (profile_id)
    `);

  if (error) throw error;

  return collections.map(transformCollectionData);
}

export async function getCollectionById(id: string) {
  const { data: collection, error } = await supabase
    .from('collections')
    .select(`
      *,
      collection_members (profile_id)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!collection) return null;

  return transformCollectionData(collection);
}

export async function getCollectionsByUser(userId: string) {
  const { data: collections, error } = await supabase
    .from('collections')
    .select(`
      *,
      collection_members (profile_id)
    `)
    .or(`created_by.eq.${userId},collection_members.profile_id.eq.${userId}`);

  if (error) throw error;

  return collections.map(transformCollectionData);
}

// Data Migration Service
export async function migrateData() {
  const { users, collections } = await import('../data/mockData');

  // Migrate users
  for (const user of users) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        username: user.username,
        full_name: user.name,
        avatar_url: user.avatar,
        cover_image_url: user.coverImage,
        bio: user.bio,
        tags: user.tags,
        created_at: user.joinedDate
      })
      .select()
      .single();

    if (profileError) throw profileError;

    // Migrate social links
    for (const link of user.socialLinks) {
      const { error: linkError } = await supabase
        .from('social_links')
        .upsert({
          profile_id: user.id,
          platform: link.platform,
          url: link.url,
          username: link.username
        });

      if (linkError) throw linkError;
    }
  }

  // Migrate collections
  for (const collection of collections) {
    const { data: collectionData, error: collectionError } = await supabase
      .from('collections')
      .upsert({
        id: collection.id,
        name: collection.name,
        description: collection.description,
        cover_image_url: collection.coverImage,
        created_by: collection.createdBy,
        is_public: collection.isPublic,
        created_at: collection.createdAt,
        updated_at: collection.updatedAt
      })
      .select()
      .single();

    if (collectionError) throw collectionError;

    // Migrate collection members
    for (const userId of collection.userIds) {
      const { error: memberError } = await supabase
        .from('collection_members')
        .upsert({
          collection_id: collection.id,
          profile_id: userId
        });

      if (memberError) throw memberError;
    }
  }
}

// Helper functions to transform data
function transformProfileToUser(profile: any): User {
  return {
    id: profile.id,
    name: profile.full_name,
    username: profile.username,
    avatar: profile.avatar_url,
    coverImage: profile.cover_image_url,
    bio: profile.bio || '',
    tags: profile.tags || [],
    socialLinks: profile.social_links?.map((link: any): SocialLink => ({
      platform: link.platform,
      url: link.url,
      username: link.username
    })) || [],
    joinedDate: profile.created_at
  };
}

function transformCollectionData(collection: any): Collection {
  return {
    id: collection.id,
    name: collection.name,
    description: collection.description || '',
    createdBy: collection.created_by,
    coverImage: collection.cover_image_url,
    userIds: collection.collection_members?.map((member: any) => member.profile_id) || [],
    isPublic: collection.is_public,
    createdAt: collection.created_at,
    updatedAt: collection.updated_at
  };
}