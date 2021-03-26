import React from 'react';
import Placeholder from '../../assets/images/res_placeholder.png';
import '../../styles/Avatar.scss';

const Avatar = ({ avatar }) => {
  return (
    <div className='logo-wrapper'>
      <div className='inner-border'>
        <img src={avatar ? avatar : Placeholder} alt='Restaurant logo' />
      </div>
    </div>
  );
};

export default Avatar;
