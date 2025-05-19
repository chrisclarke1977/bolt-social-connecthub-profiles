export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  coverImage: string;
  socialLinks: SocialLink[];
  tags: string[];
  joinedDate: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  username?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  coverImage: string;
  userIds: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}