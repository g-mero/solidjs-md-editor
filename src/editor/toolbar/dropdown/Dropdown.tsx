import { onMount } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'
import toolbarStyle from '../toolbar.module.scss'
import styles from './dropdown.module.scss'

function hideDropDown(el: HTMLElement, trigger: HTMLElement, bool = true) {
  if (bool) {
    el.style.maxHeight = '0'
    el.classList.remove(styles.open)
    hideTooltip(el, false)
    trigger.classList.remove(toolbarStyle.active)
  } else {
    el.style.maxHeight = ''
    const maxHeight = el.scrollHeight
    el.style.maxHeight = '0'
    el.classList.add(styles.open)
    setTimeout(() => {
      el.style.maxHeight = `${maxHeight}px`
    }, 10)
    trigger.classList.add(toolbarStyle.active)

    hideTooltip(el)
  }
}

function hideTooltip(el: HTMLElement, bool = true) {
  const $tooltip = el.previousElementSibling as HTMLElement

  if ($tooltip) {
    $tooltip.style.display = bool ? 'none' : ''
  }
}

export default function Dropdown(props: {
  children: JSX.Element
  trigger: HTMLElement
}) {
  let el!: HTMLDivElement

  const isOpened = (element: HTMLElement) => {
    return element.classList.contains(styles.open)
  }

  onMount(() => {
    el.style.maxHeight = '0'

    props.trigger.addEventListener('click', () => {
      hideDropDown(el, props.trigger, isOpened(el))
    })

    document.addEventListener('click', (e) => {
      const $target = e.target as HTMLElement

      if (!props.trigger.contains($target)) {
        hideDropDown(el, props.trigger, true)
      }
    })
  })

  return (
    <div ref={el} class={styles.dropdown}>
      <div class={styles['dropdown-content']}>{props.children}</div>
    </div>
  )
}
