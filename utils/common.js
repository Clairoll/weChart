/**
 * 生成随机字符串的函数
 * n:随机字符串的位数
 */
const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const RandomChars = function generateMixed(n) {
  var res = "";
  for(var i=0; i<n;i++){
    var id=Math.ceil(Math.random()*35);
    res += chars[id];
  }
  return res
}
export {RandomChars}