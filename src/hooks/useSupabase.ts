import { useState, useEffect } from 'react';
import { User, Collection } from '../types';
import * as supabaseService from '../services/supabase';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await supabaseService.getUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch users'));
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading, error };
}

export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await supabaseService.getUserById(id);
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch user'));
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchUser();
    }
  }, [id]);

  return { user, loading, error };
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await supabaseService.getCollections();
        setCollections(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch collections'));
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  return { collections, loading, error };
}

export function useCollection(id: string) {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCollection() {
      try {
        const data = await supabaseService.getCollectionById(id);
        setCollection(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch collection'));
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCollection();
    }
  }, [id]);

  return { collection, loading, error };
}