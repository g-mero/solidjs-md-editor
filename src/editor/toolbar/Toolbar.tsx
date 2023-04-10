import { isArray } from 'lodash'
import { For, Show, createSignal, onMount } from 'solid-js'
import type { MdEditorInstType } from '../MdEditor'
import Dropdown from './dropdown/Dropdown'
import Icon from './icon/Icon'
import styles from './toolbar.module.scss'
import type { ToolbarItem, ToolbarItemInst } from './toolbatItems'
import { defaultItems, divide } from './toolbatItems'
import Tooltip from './tooltip/tooltip'

function RenderToolbarItem(props: {
  item: ToolbarItem
  inst?: MdEditorInstType
}) {
  const item = props.item
  let el!: HTMLDivElement

  const [title, setTitle] = createSignal(item.title)
  const [itemInst, setItemInst] = createSignal<ToolbarItemInst>({
    $element: el,
    active(bool) {
      if (bool) itemInst().$element.classList.add(styles.active)
      else itemInst().$element.classList.remove(styles.active)
    },
    changeTitle(v) {
      setTitle(v)
    },
  })

  onMount(() => {
    // 更新el
    const tmp = itemInst()
    tmp.$element = el
    setItemInst(tmp)
  })

  return (
    <Show when={item.title} fallback={<Vr />}>
      <div class={styles['toolbar-item-wrapper']}>
        <div
          class={styles['toolbar-item']}
          onClick={() => {
            const tmp = props.item.action
            if (tmp && props.inst && !props.item.menu) {
              tmp(props.inst, itemInst())
            }
          }}
          ref={el}
        >
          <Icon icon={props.item.icon} />
        </div>
        <Tooltip content={title()} pos={['-140%', '-50%']} />
        <Show when={item.menu}>
          <Dropdown trigger={el}>
            <Show when={isArray(item.menu)}>
              <For each={item.menu as ToolbarItem[]}>
                {(item) => {
                  return <RenderToolbarItem item={item} inst={props.inst} />
                }}
              </For>
            </Show>
            <Show when={!isArray(item.menu)}>
              <RenderToolbarMenuCustom
                item={item.menu as any}
                inst={props.inst}
              />
            </Show>
          </Dropdown>
        </Show>
      </div>
    </Show>
  )
}

function RenderToolbarMenuCustom(props: {
  item: {
    innerHTML: string
    onMount: (inst: MdEditorInstType) => void
  }
  inst?: MdEditorInstType
}) {
  let el!: HTMLDivElement

  onMount(() => {
    el.innerHTML = props.item.innerHTML

    if (props.inst) props.item.onMount(props.inst)
  })
  return <div ref={el} />
}

function Vr() {
  return <div class={styles.vr} />
}

export default function Toolbar(props: {
  inst?: MdEditorInstType
  items?: ('|' | ToolbarItem)[]
}) {
  return (
    <div class={styles['toolbar-wrapper']}>
      <div>
        <For each={props.items || defaultItems}>
          {(item) => {
            if (item === '|') {
              item = divide
            }
            return <RenderToolbarItem item={item} inst={props.inst} />
          }}
        </For>
      </div>
    </div>
  )
}
