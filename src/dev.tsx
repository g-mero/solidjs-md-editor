import { render } from "solid-js/web";
import MdEditor, { undoItem, redoItem, emptyItem } from ".";

import "virtual:uno.css";

// 暴露给原生js使用，这里其实也就是对MdEditor的原生化封装
export function Editor(config: { target: HTMLElement }) {
  if (!config.target) return {};

  const toolbarItems = [undoItem, redoItem, emptyItem];

  const [content, setContent] = createSignal("hello world");

  render(
    () => (
      <div>
        <div>{content()}</div>
        <MdEditor class="flex flex-col">
          <MdEditor.Toolbar class="flex gap-2 bg-gray-2 h-28px items-center">
            {toolbarItems.map((item, idx) => (
              <MdEditor.ToolbarItem
                icon={item.icon}
                label={item.label}
                action={item.action}
                class="b-none bg-transparent cursor-pointer flex items-center justify-center hover:bg-gray-3"
              />
            ))}
          </MdEditor.Toolbar>
          <MdEditor.Main
            height="600px"
            content={content()}
            setContent={setContent}
          />
        </MdEditor>
      </div>
    ),
    config.target
  );
  return {};
}
