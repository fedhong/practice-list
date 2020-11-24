const createRouter = (config) => {

    Object.keys(config).forEach((key, i) => {
        const container = document.getElementById(key);
        container.innerHTML = config[key];
    })

    function initHash() {
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

    if (!window.onhashchange) {
        window.onhashchange = initHash;
    }

    initHash();
};

export default createRouter