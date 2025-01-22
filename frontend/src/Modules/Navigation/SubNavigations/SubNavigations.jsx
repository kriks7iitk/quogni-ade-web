import React from 'react'
import SubNavigationButton from './SubNavigationButton'



export default function SubNavigations() {

  const menuList = [{
    name: "Marked events",
    link: "/",
    iconName:'bookmark-square'
  },
  {
    name: "Saved screens",
    link: "/",
    iconName:'filters'
  }
  ]
  return (
    <div className='sub-navigation-menu'>
      {menuList.map((menu, index) => {
        return (
          <SubNavigationButton iconeName={menu?.iconName}/>
        )
      })}
    </div>
  )
}
