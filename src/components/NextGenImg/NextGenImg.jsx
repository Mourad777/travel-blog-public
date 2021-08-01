import React from 'react';

const ImgNextGen = ({
  srcWebp,
  srcJrx,
  srcJp2,
  fallback,
  alt,
  styles,
  ...props

}) => {
  return (
    <picture>
       <source style={styles} srcset={srcWebp} type="image/webp" />
       <source srcset={srcJrx} type="image/jxr" />
       <source srcset={srcJp2} type="image/jp2" />
       <source srcset={fallback} type="image/jpeg" />
       <img src={fallback} alt={alt} {...props} />
    </picture>
  );
};

export default ImgNextGen;