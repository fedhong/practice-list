### 整个文件范围内禁止规则出现警告

```
将/* eslint-disable */放置于文件最顶部
/* eslint-disable */
alert('foo');
```

### 在文件中临时禁止规则出现警告

```
将需要忽略的代码块用注释包裹起来
/* eslint-disable */
alert('foo');
/* eslint-enable */
```

### 对指定规则的启用或者禁用警告

```
将需要忽略的代码块用注释包裹起来
/* eslint-disable no-alert, no-console */
alert('foo');
console.log('bar');
/* eslint-enable no-alert, no-console */
```

### 对指定行禁用规则警告

```
此方法，有两种形式，参见下方
alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');
```

### 在指定行上禁用指定的某个规则

```
alert('foo'); // eslint-disable-line no-alert
 
// eslint-disable-next-line no-alert
alert('foo');
```

### 在某个特定的行上禁用多个规则

```
alert('foo'); // eslint-disable-line no-alert, quotes, semi
 
// eslint-disable-next-line no-alert, quotes, semi
alert('foo');
```