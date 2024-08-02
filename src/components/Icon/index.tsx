import { Icon as Iconify, addCollection, addIcon } from '@iconify-icon/solid'
import { icons } from '@iconify-json/ri'

addCollection(icons)

export default function Icon(props: { name: string, size?: number | string }) {
  return (
    <Iconify icon={props.name} width={props.size} />
  )
}
