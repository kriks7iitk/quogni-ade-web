import React from 'react'
import Icon from '../../../_icons/svgs/SolidIcons'
import SolidButton from '../../../_components/Buttons/SolidButton'
import '../navigation.theme.scss'

export default function SubNavigationButton({iconeName, onClick, onHover, isSelected, disable}) {
  return (
    <div>
        <SolidButton leftIcon={iconeName} iconWidth='20' customClass='sub-navigation-button' size='xs'/>
    </div>
  )
}
