import { createEffect, onMount } from 'solid-js'
import styles from '../toolbar.module.scss'

export default function Tooltip(props: {
  content: string
  pos: [string, string]
}) {
  let el!: HTMLDivElement
  onMount(() => {
    createEffect(() => {
      el.style.bottom = props.pos[0]
      el.style.right = props.pos[1]
    })
  })
  return (
    <div ref={el} class={styles.tooltip}>
      {props.content}
    </div>
  )
}
