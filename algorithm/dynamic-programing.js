/*

动态规划是一种分阶段求解决策问题的数学思想。（大事化小、小事化了）

动态规划三个重要观念：
1、最优子结构
    F(10) = F(9) + F(8)，因此F(9)和F(8)是F(10)的【最优子结构】
2、边界
    当有1级台阶和2级台阶时，可以直接得出结果，因此F(1)和F(2)是问题的【边界】
3、状态转移公式
    F(n) = F(n-1) + F(n-2)是阶段与阶段之间的【状态转移】

*/

/*
* 题目一：台阶
* 有一座高度是10级台阶的楼梯，从下往上走，每跨一步只能向上1级或者2级台阶。要求用程序来求出一共有多少种走法。
*/

// 方法一：递归求解 O(2^N)
function F1(n) {
    if (n < 1) { return 0 }
    if (n == 1) { return 1 };
    if (n == 2) { return 2 };
    return F1(n - 1) + F1(n - 2);
}


// 方法二：备忘录算法O(N)
const _cacheMap = {};
function F2(n) {
    if (n < 1) { return 0 }
    if (n == 1) { return 1 };
    if (n == 2) { return 2 };
    if (!_cacheMap[n]) {
        _cacheMap[n] = F2(n - 1) + F2(n - 2);
    }
    return _cacheMap[n];
}

// 方法三：动态规划O(1)
function F3(n) {
    if (n < 1) { return 0 }
    if (n == 1) { return 1 };
    if (n == 2) { return 2 };
    let a = 1, b = 2, tmp = 0;
    for (let i = 3; i <= n; i++) {
        tmp = a + b;
        a = b;
        b = tmp;
    }
    return tmp;
}


/*
* 题目二：国王的金矿
* 有一个国家发现了5座金矿，每座金矿的黄金储量不同，需要参与挖掘的工人数也不同。参与挖矿工人的总数是10人。
* 每座金矿要么全挖，要么不挖，不能派出一半人挖取一半金矿。要求用程序求解出，要想得到尽可能多的黄金，应该选择挖取哪几座金矿？
*/
const worker = 10;
const golds = [
    { gold: 50, person: 5 },
    { gold: 30, person: 3 },
    { gold: 80, person: 8 },
    { gold: 70, person: 7 },
    { gold: 110, person: 11 }
];









/**
 * 测试
 */

function runTest(fun, n) {
    const start = Date.now();
    const result = fun.call(this, n);
    const end = Date.now();
    console.log(`${fun.name} use time: ${end - start}, result: ${result}`);
}

// Test F1
runTest(F1, 10);

// Test F2
runTest(F2, 10)

// Test F3
runTest(F3, 10)