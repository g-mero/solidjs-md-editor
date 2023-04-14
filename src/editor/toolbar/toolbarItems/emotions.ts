import type { ToolbarItem } from '.'

import './emotions.scss'

const $emotions = `<ul id="g-panel-emotions-TyUh" class="g-panel-content-emotion"><li>😀</li><li>😃</li><li>😄</li><li>😁</li><li>😆</li><li>😅</li><li>😂</li><li>🤣</li><li>😊</li><li>😇</li><li>🙂</li><li>🙃</li><li>😉</li><li>😌</li><li>😍</li><li>😘</li><li>😗</li><li>😙</li><li>😚</li><li>😋</li><li>😛</li><li>😝</li><li>😜</li><li>🤓</li><li>😎</li><li>😏</li><li>😒</li><li>😞</li><li>😔</li><li>😟</li><li>😕</li><li>🙁</li><li>😣</li><li>😖</li><li>😫</li><li>😩</li><li>😢</li><li>😭</li><li>😤</li><li>😠</li><li>😡</li><li>😳</li><li>😱</li><li>😨</li><li>🤗</li><li>🤔</li><li>😶</li><li>😑</li><li>😬</li><li>🙄</li><li>😯</li><li>😴</li><li>😷</li><li>🤑</li><li>😈</li><li>🤡</li><li>💩</li><li>👻</li><li>💀</li><li>👀</li><li>👣</li><li>👐</li><li>🙌</li><li>👏</li><li>🤝</li><li>👍</li><li>👎</li><li>👊</li><li>✊</li><li>🤛</li><li>🤜</li><li>🤞</li><li>✌️</li><li>🤘</li><li>👌</li><li>👈</li><li>👉</li><li>👆</li><li>👇</li><li>☝️</li><li>✋</li><li>🤚</li><li>🖐</li><li>🖖</li><li>👋</li><li>🤙</li><li>💪</li><li>🖕</li><li>✍️</li><li>🙏</li>
</ul>`

export const emoItem: ToolbarItem = {
  title: '表情',
  icon: 'solar:emoji-funny-circle-linear',
  menu: {
    innerHTML: $emotions,
    onMount(inst) {
      const cm = inst.cm
      const $panel = inst.$element.querySelector(
        '#g-panel-emotions-TyUh',
      ) as HTMLUListElement

      if ($panel) {
        $panel.addEventListener('click', (e) => {
          const $el = e.target as HTMLElement

          if ($el.tagName === 'LI') {
            cm.replaceSelection($el.textContent || '')
            cm.refresh()
            cm.focus()
          }
        })
      }
    },
  },
}
