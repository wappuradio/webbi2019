import React, { FunctionComponent } from 'react';

import Icon from '../Icon';

interface SocialLink {
  url: string,
  icon: string,
  title: string,
  text?: string
}

const links: SocialLink[] = [{
  url: 'https://facebook.com/wappuradio',
  icon: 'facebook',
  title: 'Facebook'
},{
  url: 'https://www.instagram.com/wappuradio/',
  icon: 'instagram',
  title: 'Instagram'
},{
  url: 'https://twitter.com/@wappuradio',
  icon: 'twitter',
  title: 'Twitter'
},{
  url: 'https://t.me/wappuradio',
  icon: 'telegram',
  title: 'Telegram'
},{
  url: 'tel:+358503772779',
  icon: 'phone',
  title: 'Soita studioon',
  text: '050 377 2779'
}]

const SocialNav: FunctionComponent = () => (
  <nav className='-social'>
    {links.map((l, i) => (
      <SocialNavItem key={i} {...l} />
    ))}
  </nav>
);

const SocialNavItem: FunctionComponent<SocialLink> = ({ url, icon, title, text }) => (
  <li>
    <a href={url} target='_blank' {...(text && {className: 'icontext'})}>
      <Icon name={icon} title={title} />
      { text && (<span>{text}</span>) }
    </a>
  </li>
);

export default SocialNav;
