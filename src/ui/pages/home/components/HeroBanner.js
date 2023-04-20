import React from 'react'

export const HeroMedia = ({children}) => {
  return <div className='hero__media position-absolute w-100 h-100 top-0 left-0'>
      {
        children
      }
    </div>
}

export const HeroContent = ({children}) => {
  return <div className='hero__content position-absolute w-100 h-100 top-0 left-0 p-5'>
    {children}
  </div>
}

const HeroBanner = ({className, children}) => {
  return (
    <section className={`hero__wrapper d-flex w-100 h-auto ${className || ""}`}>
      <div className='hero d-flex w-100 position-relative' style={{paddingBottom: '56.25%', height: '0'}}>
        {
          children
        }
      </div>
    </section>
  )
}

export default HeroBanner