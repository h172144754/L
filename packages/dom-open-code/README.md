<div align="center">
  <div align="center">
    <h1>DOM OPEN CODE</h1>
    <p>点击 dom 直接跳到编辑器对应代码。</p>
    <p>支持 vite/webpack + vue2/vue3 + vscode/websopenrm </p>
  </div>
</div>
## 📦 安装

```bash
npm i dom-open-code
```

## 🔨 使用

#### 第一步

首先在项目入口文件（ `main` 文件）中引入插件初始化

```ts
import { initDomOpenCode } from 'dom-open-code'

// 初始化 dom-open-code
// initDomOpenCode()

// 推荐：只在非生产环境初始化
process.env.NODE_ENV !== 'production' && initDomOpenCode()
```

#### 第二步

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue3 from '@vitejs/plugin-vue'
import { domOpenCodePlugin } from 'dom-open-code/vite'

export default defineConfig({
  plugins: [
    vue3(),
    process.env.NODE_ENV !== 'production'
      ? domOpenCodePlugin({
          mode: 'vue',
        })
      : undefined,
  ].filter((f) => !!f)
})
```

## 💡 注意

如果无法跳转编辑器，请确保你的编辑器已经添加到环境变量，比如 vscode，添加成功后在命令终端输入

```bash
code -v
```

可以看到 vscode 版本信息意味着成功。


