import React from 'react';
import { SocialLink } from '../../types';
import { Twitter, Github, Linkedin, Instagram, Globe, AtSign, Dribbble, Bean as Behance } from 'lucide-react';

interface SocialLinksProps {
  links: SocialLink[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links, size = 'md', className = '' }) => {
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-6 w-6';
      default: return 'h-5 w-5';
    }
  };

  const getContainerClass = () => {
    switch (size) {
      case 'sm': return 'p-2';
      case 'lg': return 'p-3';
      default: return 'p-2.5';
    }
  };

  const getSocialIcon = (platform: string) => {
    const iconClass = getIconSize();
    
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter className={iconClass} />;
      case 'github':
        return <Github className={iconClass} />;
      case 'linkedin':
        return <Linkedin className={iconClass} />;
      case 'instagram':
        return <Instagram className={iconClass} />;
      case 'dribbble':
        return <Dribbble className={iconClass} />;
      case 'behance':
        return <Behance className={iconClass} />;
      case 'email':
        return <AtSign className={iconClass} />;
      default:
        return <Globe className={iconClass} />;
    }
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${getContainerClass()} rounded-full bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-primary-900 dark:hover:text-primary-400`}
          title={link.username || link.platform}
        >
          {getSocialIcon(link.platform)}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;