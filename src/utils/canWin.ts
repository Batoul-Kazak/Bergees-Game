export function canWin(arr, target) {
  function backtrack(start, sum) {
    if (sum === target) return true;
    if (sum > target) return false;
    
    for (let i = start; i < arr.length; i++) {
      if (backtrack(i + 1, sum + arr[i])) return true;
    }
    
    return false;
  }
  
  return backtrack(0, 0);
}