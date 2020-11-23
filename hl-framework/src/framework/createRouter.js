const createRouter = (config) => {
    Object.keys(config).forEach((key, i) => {
        const container = document.getElementById(key);
        container.innerHTML = config[key];
        if (i > 0) {
            container.style.display = 'none';
        }
    })

    if (!window.onhashchange) {
        window.onhashchange = function () {
            let curKey = location.hash.replace('#', '');
            curKey = curKey || 'index';

            Object.keys(config).forEach((key, i) => {
                const container = document.getElementById(key);
                if (curKey === key) {
                    container.style.display = '';
                } else {
                    container.style.display = 'none';
                }
            })
        }
    }
};

export default createRouter