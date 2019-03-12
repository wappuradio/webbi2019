import React, { FunctionComponent } from 'react';

interface InfoItemProps {
  title: string,
  content: string,
  subcontent: string,
  link?: string,
  children?: React.ReactElement
}

const InfoItem: FunctionComponent<InfoItemProps> =
  ({title, content, subcontent, link, children}) => (
  <div className='info-item'>
    {children && (
      <div className='action'>
        {children}
      </div>
    )}
    <div className='content'>
      <h2>{title}</h2>
      <p className='main'>
        {link ? (<a href={link}>{content}</a>) : (<span>{content}</span>)}
      </p>
      <p className='sub'>{subcontent}</p>
    </div>
  </div>
);

export default InfoItem;
