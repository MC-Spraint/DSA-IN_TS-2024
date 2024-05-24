export class Dp {
    static countPalindromicSubsequences(S: string): number {
      const n = S.length;
      const MOD = 1e9 + 7;
      const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  
      for (let len = 1; len <= n; len++) {
        for (let i = 0; i + len <= n; i++) {
          const j = i + len - 1;
          if (len === 1) {
            dp[i][j] = 1;
          } else {
            dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1];
            if (S[i] === S[j]) {
              dp[i][j] += dp[i + 1][j - 1] + 1;
            }
          }
          dp[i][j] = (dp[i][j] + MOD) % MOD;
        }
      }
  
      return dp[0][n - 1];
    }
  }
  