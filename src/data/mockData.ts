import { User, Collection } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    username: 'alexmorgan',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'UI/UX Designer and Frontend Developer. Creating beautiful interfaces is my passion.',
    coverImage: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/alexmorgan', username: '@alexmorgan' },
      { platform: 'github', url: 'https://github.com/alexmorgan', username: 'alexmorgan' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/alexmorgan', username: 'Alex Morgan' },
      { platform: 'dribbble', url: 'https://dribbble.com/alexmorgan', username: 'alexmorgan' }
    ],
    tags: ['Design', 'Frontend', 'UI/UX', 'React'],
    joinedDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jordan Lee',
    username: 'jordanlee',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Full-stack developer with a focus on React and Node.js. Building the web of tomorrow.',
    coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/jordanlee', username: '@jordanlee' },
      { platform: 'github', url: 'https://github.com/jordanlee', username: 'jordanlee' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/jordanlee', username: 'Jordan Lee' }
    ],
    tags: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    joinedDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Taylor Swift',
    username: 'taylorswift',
    avatar: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Backend engineer specializing in scalable systems. Coffee enthusiast and book lover.',
    coverImage: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/taylorswift', username: '@taylorswift' },
      { platform: 'github', url: 'https://github.com/taylorswift', username: 'taylorswift' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/taylorswift', username: 'Taylor Swift' }
    ],
    tags: ['Go', 'Kubernetes', 'AWS', 'Microservices'],
    joinedDate: '2023-03-10',
  },
  {
    id: '4',
    name: 'Riley Johnson',
    username: 'rileyjohnson',
    avatar: 'https://images.pexels.com/photos/936043/pexels-photo-936043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Product designer and illustrator. Creating delightful user experiences one pixel at a time.',
    coverImage: 'https://images.pexels.com/photos/7691441/pexels-photo-7691441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/rileyjohnson', username: '@rileyjohnson' },
      { platform: 'dribbble', url: 'https://dribbble.com/rileyjohnson', username: 'rileyjohnson' },
      { platform: 'behance', url: 'https://behance.net/rileyjohnson', username: 'Riley Johnson' }
    ],
    tags: ['Design', 'Illustration', 'Figma', 'User Research'],
    joinedDate: '2023-04-05',
  },
  {
    id: '5',
    name: 'Cameron Wilson',
    username: 'cameronwilson',
    avatar: 'https://images.pexels.com/photos/594610/pexels-photo-594610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Machine learning engineer passionate about AI ethics. Working on the intersection of technology and humanity.',
    coverImage: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/cameronwilson', username: '@cameronwilson' },
      { platform: 'github', url: 'https://github.com/cameronwilson', username: 'cameronwilson' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/cameronwilson', username: 'Cameron Wilson' }
    ],
    tags: ['Machine Learning', 'Python', 'TensorFlow', 'Ethics'],
    joinedDate: '2023-05-12',
  },
  {
    id: '6',
    name: 'Avery Martinez',
    username: 'averymartinez',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Open source advocate and community builder. Helping developers connect and grow together.',
    coverImage: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/averymartinez', username: '@averymartinez' },
      { platform: 'github', url: 'https://github.com/averymartinez', username: 'averymartinez' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/averymartinez', username: 'Avery Martinez' }
    ],
    tags: ['Open Source', 'Community', 'DevRel', 'JavaScript'],
    joinedDate: '2023-06-20',
  }
];

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Frontend Developers',
    description: 'A collection of talented frontend developers who create beautiful user interfaces.',
    createdBy: '1',
    coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userIds: ['1', '2', '4'],
    isPublic: true,
    createdAt: '2023-01-20',
    updatedAt: '2023-07-15',
  },
  {
    id: '2',
    name: 'Design Enthusiasts',
    description: 'People who are passionate about design and create amazing visual experiences.',
    createdBy: '4',
    coverImage: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userIds: ['1', '4', '6'],
    isPublic: true,
    createdAt: '2023-02-10',
    updatedAt: '2023-07-20',
  },
  {
    id: '3',
    name: 'Tech Leaders',
    description: 'Innovators and leaders who are pushing the boundaries of technology.',
    createdBy: '3',
    coverImage: 'https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userIds: ['3', '5'],
    isPublic: true,
    createdAt: '2023-03-15',
    updatedAt: '2023-07-25',
  },
  {
    id: '4',
    name: 'Creative Coders',
    description: 'Developers who blend creativity with code to build innovative projects.',
    createdBy: '2',
    coverImage: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userIds: ['1', '2', '4', '6'],
    isPublic: true,
    createdAt: '2023-04-05',
    updatedAt: '2023-07-30',
  }
];

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getCollectionById = (id: string): Collection | undefined => {
  return collections.find(collection => collection.id === id);
};

export const getUsersInCollection = (collectionId: string): User[] => {
  const collection = getCollectionById(collectionId);
  if (!collection) return [];
  
  return collection.userIds.map(id => getUserById(id)).filter((user): user is User => !!user);
};

export const getCollectionsByUser = (userId: string): Collection[] => {
  return collections.filter(collection => 
    collection.createdBy === userId || collection.userIds.includes(userId)
  );
};