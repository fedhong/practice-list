function _getXhr() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        //遍历IE中不同版本的ActiveX对象
        const versions = ['Microsoft', 'msxm3', 'msxml2', 'msxml1'];
        for (let i = 0; i < versions.length; i++) {
            try {
                const version = versions[i] + '.XMLHTTP';
                return new ActiveXObject(version);
            } catch (e) {
                console.error('该浏览器不支持Ajax请求，请更新浏览器！');
            }
        }
    }
}

function _urlFormat(url, data, method, dataType) {
    if (method === 'GET' || dataType.toUpperCase() === 'JSONP') {
        url += url.indexOf('?') > -1 ? (url.indexOf('=') > -1 ? `&${data}` : data) : `?${data}`;
    }
    return url;
}

function _dataFormat(data, method, dataType) {
    if (method === 'GET' || dataType.toUpperCase() === 'JSONP') {
        const res = [];
        Object.keys(data).forEach(key => {
            res.push(`${key}=${data[key]}`);
        })
        return res.join('&');
    } else {
        //TODO POST的x-www-form-urlencoded支持
        //TODO POST的FormData支持
        return JSON.stringify(data);
    }
}

function _createAjax(config) {
    return new Promise((resolve, reject) => {

        let { url, method = 'GET', data = {}, dataType = '', timeout, headers, async = true } = config;
        method = method.toUpperCase();
        data = _dataFormat(data, method, dataType);
        url = _urlFormat(url, data, method, dataType);

        if (dataType.toUpperCase() === 'JSONP') {

            let script = document.createElement('script'),
                timeName = new Date().getTime() + Math.round(Math.random() * 1000),
                callback = 'JSONP_' + timeName;
            window[callback] = function (data) {
                document.body.removeChild(script);
                resolve(data);
            }

            script.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + callback;
            script.type = 'text/javascript';
            document.body.appendChild(script);

            timeout && setTimeout(() => {
                delete window[callback];
                document.body.removeChild(script);
            }, timeOut);

        } else {

            const xhr = _getXhr();
            xhr.open(method, url, async);

            //header设置                        
            if (headers) {
                let customContentType = false;
                for (let key in headers) {
                    xhr.setRequestHeader(`${key.toString()}`, `${headers[key].toString()}`)
                    if (key.toLowerCase() === 'content-type') {
                        customContentType = true;
                    }
                }
                !customContentType && xhr.setRequestHeader('content-type', 'application/json;charset=utf-8');
            }

            //timeout设置
            if (timeout) {
                xhr.timeout = timeout;
                xhr.addEventListener('timeout', e => {
                    reject(new Error('请求超时'));
                })
            }

            //监听状态
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const { status, statusText } = xhr;

                    if ((status >= 200 && status < 300) || status == 304) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject({
                            status,
                            statusText
                        });
                    }
                }
            }

            //发送数据
            xhr.send(method === 'GET' ? null : data);
        }
    })
}

function get(config) {
    return _createAjax({
        ...config,
        method: 'GET'
    });
}

function post(config) {
    return _createAjax({
        ...config,
        method: 'POST'
    });
}

function jsonp(config) {
    return _createAjax({
        ...config,
        dataType: 'JSONP'
    });
}

function ajax(config) {
    return _createAjax(config)
}

export { get, post, jsonp, ajax };