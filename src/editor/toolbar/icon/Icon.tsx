import { Icon as SolidIcon, addIcon } from '@iconify-icon/solid'

import eyeLinear from '@iconify-icons/solar/eye-linear'
import emojiFunnyFircleLinear from '@iconify-icons/solar/emoji-funny-circle-linear'
import eraserLinear from '@iconify-icons/solar/eraser-linear'
import undoLeftRoundLinear from '@iconify-icons/solar/undo-left-round-linear'
import undoRightRoundLinear from '@iconify-icons/solar/undo-right-round-linear'

import styles from './icon.module.scss'

addIcon('solar:eye-linear', eyeLinear)
addIcon('solar:undo-left-round-linear', undoLeftRoundLinear)
addIcon('solar:undo-right-round-linear', undoRightRoundLinear)
addIcon('solar:eraser-linear', eraserLinear)
addIcon('solar:emoji-funny-circle-linear', emojiFunnyFircleLinear)

export default function Icon(props: { icon: string }) {
  return <SolidIcon icon={props.icon} width="1.3em" class={styles.icon} />
}
