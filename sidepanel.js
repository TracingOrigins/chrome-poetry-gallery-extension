// 存储诗歌数据
let poems = [];
let currentDisplayedPoems = []; // 存储当前显示的诗歌

// 添加分页相关变量
let currentPage = 0;
let filteredPoems = [];

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化DOM元素
    const searchInput = document.getElementById('searchInput');
    const dynastyFilter = document.getElementById('dynastyFilter');
    const authorFilter = document.getElementById('authorFilter');
    const typeFilter = document.getElementById('typeFilter');
    const exportButton = document.getElementById('exportButton');
    const searchButton = document.getElementById('searchButton');
    const filterButton = document.getElementById('filterButton');
    const moreButton = document.getElementById('moreButton');
    const moreDropdown = document.querySelector('.more-dropdown');
    const searchBox = document.getElementById('searchBox');
    const filterBox = document.getElementById('filterBox');
    const clearButton = document.getElementById('clearButton');
    const prevPoemButton = document.getElementById('prevPoemButton');
    const nextPoemButton = document.getElementById('nextPoemButton');
    const pageInput = document.getElementById('pageInput');
    const totalPages = document.getElementById('totalPages');

    // 搜索按钮点击事件
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            searchBox.style.display = searchBox.style.display === 'none' ? 'block' : 'none';
            if (searchBox.style.display === 'block') {
                filterBox.style.display = 'none';
                searchInput.focus();
            }
        });
    }

    // 筛选按钮点击事件
    if (filterButton) {
        filterButton.addEventListener('click', () => {
            filterBox.style.display = filterBox.style.display === 'none' ? 'block' : 'none';
            if (filterBox.style.display === 'block') {
                searchBox.style.display = 'none';
            }
        });
    }

    // 更多按钮点击事件
    if (moreButton) {
        moreButton.addEventListener('click', (e) => {
            e.stopPropagation();
            moreDropdown.classList.toggle('show');
        });
    }

    // 点击页面其他地方关闭搜索框、筛选框和更多下拉菜单
    document.addEventListener('click', (e) => {
        if (searchButton && filterButton && searchBox && filterBox) {
            if (!searchButton.contains(e.target) && !searchBox.contains(e.target) &&
                !filterButton.contains(e.target) && !filterBox.contains(e.target) &&
                !moreButton.contains(e.target) && !moreDropdown.contains(e.target)) {
                searchBox.style.display = 'none';
                filterBox.style.display = 'none';
                moreDropdown.classList.remove('show');
            }
        }
    });

    // 加载诗歌数据
    fetch(chrome.runtime.getURL('data/poems.json'))
        .then(response => response.json())
        .then(data => {
            poems = data.poems;
            initializeFilters();
            displayPoems(poems);
        })
        .catch(error => {
            console.error('Error loading poems:', error);
        });

    // 初始化筛选选项
    function initializeFilters() {
        if (!dynastyFilter || !authorFilter || !typeFilter) return;

        // 获取所有朝代
        const dynasties = [...new Set(poems.map(poem => poem.dynasty))];
        dynasties.forEach(dynasty => {
            const option = document.createElement('option');
            option.value = dynasty;
            option.textContent = dynasty;
            dynastyFilter.appendChild(option);
        });

        // 获取所有作者
        const authors = [...new Set(poems.map(poem => poem.author))];
        authors.forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorFilter.appendChild(option);
        });

        // 获取所有标签
        const tags = [...new Set(poems.flatMap(poem => poem.tags))];
        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            typeFilter.appendChild(option);
        });
    }

    // 监听搜索输入
    if (searchInput) {
        searchInput.addEventListener('input', filterPoems);
    }
    if (dynastyFilter) {
        dynastyFilter.addEventListener('change', filterPoems);
    }
    if (authorFilter) {
        authorFilter.addEventListener('change', filterPoems);
    }
    if (typeFilter) {
        typeFilter.addEventListener('change', filterPoems);
    }

    // 监听导出按钮点击
    if (exportButton) {
        exportButton.addEventListener('click', (e) => {
            e.stopPropagation();
            exportToMarkdown();
            moreDropdown.classList.remove('show');
        });
    }

    // 添加清空按钮事件监听
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            // 清空搜索框
            if (searchInput) {
                searchInput.value = '';
            }

            // 重置筛选选项
            if (dynastyFilter) dynastyFilter.value = '';
            if (authorFilter) authorFilter.value = '';
            if (typeFilter) typeFilter.value = '';

            // 隐藏搜索框和筛选框
            if (searchBox) searchBox.style.display = 'none';
            if (filterBox) filterBox.style.display = 'none';

            // 重置按钮状态
            searchButton.classList.remove('active');
            filterButton.classList.remove('active');

            // 显示所有诗词
            displayPoems(poems);
        });
    }

    // 更新页码显示
    function updatePageInfo() {
        if (pageInput && totalPages) {
            pageInput.value = currentPage + 1;
            totalPages.textContent = filteredPoems.length;
        }
    }

    // 显示当前诗词
    function displayCurrentPoem() {
        if (filteredPoems.length === 0) {
            const poemList = document.getElementById('poemList');
            poemList.innerHTML = '<div class="empty-message">没有找到相关诗词</div>';
            return;
        }

        const poem = filteredPoems[currentPage];
        const poemList = document.getElementById('poemList');
        poemList.innerHTML = `
            <li class="poem-card">
                <h2 class="poem-title">${poem.title}</h2>
                <p class="poem-author">${poem.dynasty} · ${poem.author}</p>
                <div class="poem-content">
                    ${poem.content.map(line => `<div class="poem-line-wrapper"><span class="poem-line">${line}</span></div>`).join('')}
                </div>
                <div class="poem-translation">
                    ${poem.translation.map(line => `<div class="poem-line-wrapper"><span class="poem-line">${line}</span></div>`).join('')}
                </div>
                <div class="poem-tags">
                    ${poem.tags.map(tag => `<span class="poem-tag">${tag}</span>`).join('')}
                </div>
            </li>
        `;
        updatePageInfo();
    }

    // 添加底部导航按钮点击事件
    if (prevPoemButton) {
        prevPoemButton.addEventListener('click', () => {
            if (filteredPoems.length > 0) {
                currentPage = (currentPage - 1 + filteredPoems.length) % filteredPoems.length;
                displayCurrentPoem();
            }
        });
    }

    if (nextPoemButton) {
        nextPoemButton.addEventListener('click', () => {
            if (filteredPoems.length > 0) {
                currentPage = (currentPage + 1) % filteredPoems.length;
                displayCurrentPoem();
            }
        });
    }

    // 添加页码输入事件
    if (pageInput) {
        pageInput.addEventListener('change', () => {
            const page = parseInt(pageInput.value);
            if (page >= 1 && page <= filteredPoems.length) {
                currentPage = page - 1;
                displayCurrentPoem();
            } else {
                pageInput.value = currentPage + 1;
            }
        });

        pageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                pageInput.blur();
            }
        });
    }

    // 筛选诗歌
    function filterPoems() {
        if (!searchInput || !dynastyFilter || !authorFilter || !typeFilter) return;

        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedDynasty = dynastyFilter.value;
        const selectedAuthor = authorFilter.value;
        const selectedType = typeFilter.value;

        filteredPoems = poems.filter(poem => {
            // 搜索词匹配
            const searchMatch = searchTerm === '' || 
                poem.title.toLowerCase().includes(searchTerm) ||
                poem.author.toLowerCase().includes(searchTerm) ||
                poem.dynasty.toLowerCase().includes(searchTerm) ||
                poem.content.some(line => line.toLowerCase().includes(searchTerm)) ||
                poem.translation.some(line => line.toLowerCase().includes(searchTerm)) ||
                poem.tags.some(tag => tag.toLowerCase().includes(searchTerm));

            // 朝代匹配
            const dynastyMatch = selectedDynasty === '' || poem.dynasty === selectedDynasty;

            // 作者匹配
            const authorMatch = selectedAuthor === '' || poem.author === selectedAuthor;

            // 类型匹配
            const typeMatch = selectedType === '' || poem.tags.includes(selectedType);

            return searchMatch && dynastyMatch && authorMatch && typeMatch;
        });

        currentPage = 0; // 重置到第一页
        displayCurrentPoem();
    }

    // 显示诗歌列表
    function displayPoems(poemsToDisplay) {
        filteredPoems = poemsToDisplay;
        currentPage = 0;
        displayCurrentPoem();
    }

    // 导出为Markdown
    function exportToMarkdown() {
        if (filteredPoems.length === 0) {
            showModal('没有可导出的诗词');
            return;
        }

        const currentPoem = filteredPoems[currentPage];
        let markdown = `# ${currentPoem.title}\n\n`;
        markdown += `**${currentPoem.dynasty} · ${currentPoem.author}**\n\n`;
        
        // 添加诗词内容
        markdown += '```\n';
        if (Array.isArray(currentPoem.content)) {
            markdown += currentPoem.content.join('\n');
        } else {
            markdown += currentPoem.content;
        }
        markdown += '\n```\n\n';
        
        // 添加译文
        if (currentPoem.translation) {
            markdown += '## 译文\n\n';
            markdown += '```\n';
            if (Array.isArray(currentPoem.translation)) {
                markdown += currentPoem.translation.join('\n');
            } else {
                markdown += currentPoem.translation;
            }
            markdown += '\n```\n\n';
        }
        
        // 添加标签
        if (currentPoem.tags && currentPoem.tags.length > 0) {
            markdown += '## 标签\n\n';
            markdown += currentPoem.tags.map(tag => `#${tag}`).join(' ');
        }
        
        // 创建 Blob 对象
        const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
        
        // 创建下载链接
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${currentPoem.title}.md`; // 使用诗词名称作为文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    // 显示模态框
    function showModal(message) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-message">${message}</div>
                <button class="modal-button">确定</button>
            </div>
        `;

        document.body.appendChild(modal);

        const button = modal.querySelector('.modal-button');
        button.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
});