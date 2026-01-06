#include <bits/stdc++.h>
using namespace std;

int solve(vector<vector<int>> &V, int r, int c, vector<vector<int>> &dp) {
    int R = V.size();
    int C = V[0].size();

    if (r >= R || c >= C)
        return INT_MAX;

    if (r == R - 1 && c == C - 1)
        return V[r][c];

    if (dp[r][c] != -1)
        return dp[r][c];

    int down = solve(V, r + 1, c, dp);
    int right = solve(V, r, c + 1, dp);

    return dp[r][c] = V[r][c] + min(down, right);
}

int findMinPath(vector<vector<int>> &V) {
    int R = V.size();
    int C = V[0].size();
    vector<vector<int>> dp(R, vector<int>(C, -1));
    return solve(V, 0, 0, dp);
}
