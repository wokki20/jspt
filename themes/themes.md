# Themes

JSPT supports custom themes to match your project's design. The community can create and share themes to be listed here. Below is a collection of all available themes for JSPT.

<div class="search-container">
    <input type="text" id="theme-search" placeholder="Search themes by name..." />
    <div class="search-help">
        <p><strong>Search Tips:</strong></p>
        <ul>
            <li>Search by name (default): <code>dark</code></li>
            <li>Search by author: <code>author:john</code></li>
            <li>Search by tags: <code>tags:minimal</code></li>
            <li>Search by description: <code>description:modern</code></li>
            <li>Search by license: <code>license:MIT</code></li>
        </ul>
    </div>
</div>

### Available Themes
<br>
<div id="theme-list"></div>

<script>
    let allThemes = {};

    function filterThemes() {
        const searchInput = document.getElementById('theme-search');
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        const themeCards = document.querySelectorAll('.theme-card');
        
        if (!searchTerm) {
            themeCards.forEach(card => card.classList.remove('hidden'));
            return;
        }

        let searchField = 'name';
        let searchValue = searchTerm;

        if (searchTerm.includes(':')) {
            const parts = searchTerm.split(':');
            const potentialField = parts[0].toLowerCase();
            
            if (['author', 'tags', 'description', 'license'].includes(potentialField)) {
                searchField = potentialField;
                searchValue = parts.slice(1).join(':').trim();
            }
        }

        themeCards.forEach(card => {
            const themeName = card.getAttribute('data-theme-name');
            const themeData = allThemes[themeName];
            
            if (!themeData) {
                card.classList.add('hidden');
                return;
            }

            let matches = false;

            switch(searchField) {
                case 'author':
                    matches = themeData.author.toLowerCase().includes(searchValue);
                    break;
                case 'tags':
                    matches = themeData.categories.some(cat => 
                        cat.toLowerCase().includes(searchValue)
                    );
                    break;
                case 'description':
                    matches = themeData.description.toLowerCase().includes(searchValue);
                    break;
                case 'license':
                    matches = themeData.license.toLowerCase().includes(searchValue);
                    break;
                case 'name':
                default:
                    matches = themeData.display_name.toLowerCase().includes(searchValue) ||
                              themeData.name.toLowerCase().includes(searchValue);
                    break;
            }

            if (matches) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    fetch("../themes_list.json")
        .then(response => response.json())
        .then(data => {
            const validThemes = {};
            const promises = Object.entries(data).map(([themeName, themeUrl]) => {
                return fetch(themeUrl)
                    .then(response => response.json())
                    .then(themeData => {
                        const requiredFields = ['name', 'display_name', 'description', 'author', 'github', 'homepage', 'version', 'license', 'theme_url', 'categories', 'released_on', 'updated_on'];
                        const hasAllFields = requiredFields.every(field => themeData.hasOwnProperty(field));
                        
                        if (hasAllFields && themeData.name === themeName) {
                            validThemes[themeName] = themeData;
                        }
                    })
                    .catch(error => console.error(`Failed to load theme ${themeName}:`, error));
            });

            Promise.all(promises).then(() => {
                allThemes = validThemes;
                const themeList = document.getElementById('theme-list');

                Object.entries(validThemes).forEach(([themeName, themeData]) => {
                    const themeCard = document.createElement('div');
                    themeCard.classList.add('theme-card');
                    themeCard.setAttribute('data-theme-name', themeName);

                    const themeHeader = document.createElement('div');
                    themeHeader.classList.add('theme-header');

                    const themeNameElement = document.createElement('h3');
                    themeNameElement.classList.add('theme-name');
                    themeNameElement.textContent = themeData.display_name;
                    themeHeader.appendChild(themeNameElement);

                    const themeVersion = document.createElement('span');
                    themeVersion.classList.add('theme-version');
                    themeVersion.textContent = `v${themeData.version}`;
                    themeHeader.appendChild(themeVersion);

                    themeCard.appendChild(themeHeader);

                    const themeAuthorElement = document.createElement('p');
                    themeAuthorElement.classList.add('theme-author');
                    themeAuthorElement.textContent = `By ${themeData.author}`;
                    themeCard.appendChild(themeAuthorElement);

                    const themeDescriptionElement = document.createElement('p');
                    themeDescriptionElement.classList.add('theme-description');
                    themeDescriptionElement.textContent = themeData.description;
                    themeCard.appendChild(themeDescriptionElement);

                    const themeCategories = document.createElement('div');
                    themeCategories.classList.add('theme-categories');
                    themeData.categories.forEach(category => {
                        const categoryTag = document.createElement('span');
                        categoryTag.classList.add('category-tag');
                        categoryTag.textContent = category;
                        themeCategories.appendChild(categoryTag);
                    });
                    themeCard.appendChild(themeCategories);

                    const themeInfo = document.createElement('div');
                    themeInfo.classList.add('theme-info');

                    const generalInfo = document.createElement('div');
                    generalInfo.classList.add('general-info');

                    const themeLicense = document.createElement('span');
                    themeLicense.classList.add('theme-license');
                    themeLicense.textContent = `License: ${themeData.license}`;
                    generalInfo.appendChild(themeLicense);

                    const themeReleased = document.createElement('span');
                    themeReleased.classList.add('theme-date');
                    themeReleased.textContent = `Released: ${themeData.released_on}`;
                    generalInfo.appendChild(themeReleased);

                    const themeUpdated = document.createElement('span');
                    themeUpdated.classList.add('theme-date');
                    themeUpdated.textContent = `Updated: ${themeData.updated_on}`;
                    generalInfo.appendChild(themeUpdated);

                    themeInfo.appendChild(generalInfo);

                    const themeLinks = document.createElement('div');
                    themeLinks.classList.add('theme-links');

                    const githubLink = document.createElement('a');
                    githubLink.href = themeData.github;
                    githubLink.target = '_blank';
                    githubLink.classList.add('theme-link');
                    githubLink.innerHTML = '<i class="fa fa-github" aria-hidden="true"></i> GitHub';
                    themeLinks.appendChild(githubLink);

                    const homepageLink = document.createElement('a');
                    homepageLink.href = themeData.homepage;
                    homepageLink.target = '_blank';
                    homepageLink.classList.add('theme-link');
                    homepageLink.innerHTML = '<i class="fa fa-globe" aria-hidden="true"></i> Homepage';
                    themeLinks.appendChild(homepageLink);

                    themeInfo.appendChild(themeLinks);

                    themeCard.appendChild(themeInfo);

                    const themeButtons = document.createElement('div');
                    themeButtons.classList.add('theme-buttons');

                    const themeUrlLink = document.createElement('a');
                    themeUrlLink.href = themeData.theme_url;
                    themeUrlLink.target = '_blank';
                    themeUrlLink.classList.add('theme-link', 'theme-link-button');
                    themeUrlLink.textContent = 'Preview Theme';
                    themeButtons.appendChild(themeUrlLink);

                    const themeCopyButton = document.createElement('button');
                    themeCopyButton.classList.add('theme-link', 'theme-link-primary');
                    themeCopyButton.textContent = 'Copy Link Tag';
                    themeCopyButton.onclick = async () => {
                        const linkTag = `<link rel="stylesheet" href="${themeData.theme_url}">`;
                        await navigator.clipboard.writeText(linkTag);
                        themeCopyButton.textContent = 'Copied!';
                        setTimeout(() => {
                            themeCopyButton.textContent = 'Copy Link Tag';
                        }, 2000);
                    };
                    themeButtons.appendChild(themeCopyButton);

                    themeCard.appendChild(themeButtons);
                    
                    themeList.appendChild(themeCard);
                });

                const searchInput = document.getElementById('theme-search');
                searchInput.addEventListener('input', filterThemes);
            });
        });
</script>