import { Icon as SolidIcon, addIcon } from '@iconify-icon/solid'

import eyeLinear from '@iconify-icons/solar/eye-linear'
import styles from './icon.module.scss'

addIcon('solar:eye', eyeLinear)

export default function Icon(props: { icon: string }) {
  return <SolidIcon icon={props.icon} width="1.3em" class={styles.icon} />
}
