// 初始化侧边栏
(async function initialize() {

  try {
    // 设置侧边栏行为
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
    // console.log('侧边栏行为设置成功');

  } catch (error) {
    // console.error('初始化失败:', error);
  }
})();