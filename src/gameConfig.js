function getCurrentTheme() {
    const savedTheme = getSavedTheme();
    
    if (savedTheme === 'system') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    return savedTheme;
}

function getBackgroundColor() {
    const theme = getCurrentTheme();
    return theme === 'dark' ? '#2a2a2a' : '#D9D9D9';
}

function createGameConfig() {
    return {
        width: 700,
        height: 800,
        backgroundColor: getBackgroundColor(),
    };
}

export function getSavedTheme() {
    return localStorage.getItem('theme') || 'system';
}

export function setTheme(theme) {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    
    const currentTheme = getCurrentTheme();
    if (window.themeChangeCallback) {
        window.themeChangeCallback(currentTheme);
    }
}

export function applyTheme(theme) {
    const lightLink = document.querySelector('link[href="./light.css"]');
    const darkLink = document.querySelector('link[href="./dark.css"]');
    
    if (theme === 'system') {
        lightLink.media = '(prefers-color-scheme: light)';
        darkLink.media = '(prefers-color-scheme: dark)';
    } else if (theme === 'light') {
        lightLink.media = 'all';
        darkLink.media = 'not all';
    } else if (theme === 'dark') {
        lightLink.media = 'not all';
        darkLink.media = 'all';
    }
    
    const currentTheme = getCurrentTheme();
    if (window.themeChangeCallback) {
        window.themeChangeCallback(currentTheme);
    }
}

export function getGameConfig() {
    return createGameConfig();
}

export function getTheme() {
    return getCurrentTheme();
}

export function onThemeChange(callback) {
    window.themeChangeCallback = callback;
    
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            const savedTheme = getSavedTheme();
            if (savedTheme === 'system') {
                callback(e.matches ? 'dark' : 'light');
            }
        });
    }
}

export default createGameConfig();
