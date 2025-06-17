# Poetry Gallery - 诗词长廊

一个优雅的 Chrome 浏览器扩展，让您在浏览网页时也能感受中国古典诗词之美。

## 功能特点

- 📚 丰富的诗词库：收录大量经典古诗词作品
- 🔍 智能搜索：支持按标题、作者、朝代、内容等多维度搜索
- 🏷️ 分类筛选：可按朝代、作者、类型进行筛选
- 📝 导出功能：支持将诗词导出为 Markdown 格式
- 📄 分页浏览：支持分页查看诗词列表
- 🔄 快速导航：使用上一首/下一首按钮快速切换诗词
- 🌓 深色模式：支持自动跟随系统切换深色/浅色主题
- 📱 响应式设计：完美适配各种屏幕尺寸

## 安装方法

1. 下载本扩展的源代码
2. 打开 Chrome 浏览器，进入扩展管理页面（chrome://extensions/）
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择本扩展的源代码目录

## 使用说明

### 搜索诗词
- 点击搜索图标，在搜索框中输入关键词
- 支持搜索诗词标题、作者、朝代、内容等

### 筛选功能
- 点击筛选图标，可以按以下条件筛选：
  - 朝代：如唐、宋、元、明、清等
  - 作者：如李白、杜甫、苏轼等
  - 类型：如山水、抒情、咏物等

### 导出功能
- 在诗词详情页面点击导出按钮
- 自动将当前诗词导出为 Markdown 格式
- 包含标题、作者、朝代、原文、译文和标签

### 分页浏览
- 使用分页控件浏览诗词列表
- 支持直接输入页码跳转
- 显示当前页码和总页数

### 快速导航
- 使用上一首/下一首按钮快速切换诗词

### 主题切换
- 自动跟随系统主题设置
- 支持深色/浅色两种显示模式

## 项目结构

```
chrome-poetry-gallery-extension/
├── manifest.json          # 扩展配置文件
├── background.js         # 后台脚本
├── sidepanel.html       # 侧边栏主界面
├── sidepanel.css        # 样式文件
├── sidepanel.js         # 主要逻辑代码
├── data/                # 数据文件
│   └── poems.json       # 诗词数据
└── icons/               # 图标资源
    ├── icon16.png       # 16x16 图标，用于扩展管理页面的列表视图
    ├── icon48.png       # 48x48 图标，用于扩展管理页面的详细视图
    └── icon128.png      # 128x128 图标，用于 Chrome 网上应用商店展示
```

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Chrome Extension API

## 开发说明

### 本地开发

1. 克隆项目
```bash
git clone https://github.com/tracingorigins/chrome-poetry-gallery-extension.git
```

2. 在 Chrome 浏览器中加载扩展
   - 打开 Chrome 浏览器，进入扩展管理页面（chrome://extensions/）
   - 开启右上角的"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目文件夹

3. 开发调试
   - 修改代码后，在扩展管理页面点击扩展的刷新按钮即可更新
   - 使用 Chrome 开发者工具进行调试

### 添加新诗词

1. 在 `data/poems.json` 中添加新的诗词数据
2. 确保数据格式正确：
```json
{
  "title": "诗词标题",
  "author": "作者",
  "dynasty": "朝代",
  "content": ["诗词内容", "分行显示"],
  "translation": ["译文内容", "分行显示"],
  "tags": ["标签1", "标签2"]
}
```

## 贡献指南

1. Fork 本项目
2. 创建新的分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- 项目维护者：Kevin
- 邮箱：liuqjit@outlook.com
- 项目链接：https://github.com/tracingorigins/chrome-poetry-gallery-extension

## 致谢

- 感谢所有为本项目提供诗词数据的贡献者
- 感谢所有使用和反馈的用户 