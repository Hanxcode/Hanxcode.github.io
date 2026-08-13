/**
 * 通用工具函数集合
 */

/**
 * 匹配单词/词组的正则表达式：
 * - 左侧分支：匹配英文、数字、部分拉丁/希腊/阿拉伯/西里尔字符序列
 * - 右侧分支：匹配 CJK（中日韩统一表意文字）、日文假名、韩文等字符序列
 *
 * 设计思路：
 * 英文等表音文字通常以“词”为单位计数；
 * 中文等表意文字没有空格分词，因此按“字”计数。
 */
const pattern = /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g;

/**
 * 统计文本字数
 *
 * @param {string} data 需要统计的纯文本内容
 * @returns {number} 字数统计结果
 *
 * 统计规则：
 * 1. 先通过正则提取出所有“词/字”单元
 * 2. 对于 CJK 字符（charCode >= 0x4E00），按字符长度累加
 * 3. 对于英文、数字等，每个匹配单元计为 1 个词
 */
export function countWord(data) {
    const m = data.match(pattern);
    let count = 0;

    if (!m) {
        return 0;
    }

    for (let i = 0; i < m.length; i++) {
        // 如果词以 CJK 字符开头，则按字数累加
        if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length;  // 中文字符按字数统计
        } else {
            count += 1;  // 英文、数字等按词统计
        }
    }

    return count;
}
