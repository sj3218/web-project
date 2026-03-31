#include <iostream>
#include <algorithm>
#include <tuple>

using namespace std;
/*첫째 줄부터 4개의 줄에 각 칸의 들어있는 물고기의 정보가 1번 행부터 순서대로 주어진다. 
물고기의 정보는 두 정수 ai, bi로 이루어져 있고, ai는 물고기의 번호, bi는 방향을 의미한다. 
방향 bi는 8보다 작거나 같은 자연수를 의미하고, 
1부터 순서대로 ↑, ↖, ←, ↙, ↓, ↘, →, ↗ 를 의미한다. */
/*상어가 먹을 수 있는 물고기 번호의 합의 최댓값을 출력한다.*/
/*
7 6 2 3 15 6 9 8
3 1 1 8 14 7 10 1
6 1 13 6 4 3 11 4
16 1 8 7 5 2 12 2
33

16 7 1 4 4 3 12 8
14 7 7 6 3 4 10 2
5 2 15 2 8 3 6 4
11 8 2 4 13 5 9 4
43
*/
/*
4×4크기의 공간이 있고, 크기가 1×1인 정사각형 칸으로 나누어져 있다. 
공간의 각 칸은 (x, y)와 같이 표현하며, x는 행의 번호, y는 열의 번호이다. 
한 칸에는 물고기가 한 마리 존재한다. 각 물고기는 번호와 방향을 가지고 있다. 
번호는 1보다 크거나 같고, 16보다 작거나 같은 자연수이며, 두 물고기가 같은 번호를 갖는 경우는 없다. 
방향은 8가지 방향(상하좌우, 대각선) 중 하나이다.

오늘은 청소년 상어가 이 공간에 들어가 물고기를 먹으려고 한다. 
청소년 상어는 (0, 0)에 있는 물고기를 먹고, (0, 0)에 들어가게 된다. 
상어의 방향은 (0, 0)에 있던 물고기의 방향과 같다. 이후 물고기가 이동한다.

물고기는 번호가 작은 물고기부터 순서대로 이동한다. 
물고기는 한 칸을 이동할 수 있고, 이동할 수 있는 칸은 빈 칸과 다른 물고기가 있는 칸, 
이동할 수 없는 칸은 상어가 있거나, 공간의 경계를 넘는 칸이다. 
각 물고기는 방향이 이동할 수 있는 칸을 향할 때까지 방향을 45도 반시계 회전시킨다. 
만약, 이동할 수 있는 칸이 없으면 이동을 하지 않는다. 그 외의 경우에는 그 칸으로 이동을 한다. 
물고기가 다른 물고기가 있는 칸으로 이동할 때는 서로의 위치를 바꾸는 방식으로 이동한다.

물고기의 이동이 모두 끝나면 상어가 이동한다. 
상어는 방향에 있는 칸으로 이동할 수 있는데, 한 번에 여러 개의 칸을 이동할 수 있다. 
상어가 물고기가 있는 칸으로 이동했다면, 그 칸에 있는 물고기를 먹고, 그 물고기의 방향을 가지게 된다. 
이동하는 중에 지나가는 칸에 있는 물고기는 먹지 않는다. 물고기가 없는 칸으로는 이동할 수 없다. 
상어가 이동할 수 있는 칸이 없으면 공간에서 벗어나 집으로 간다. 상어가 이동한 후에는 다시 물고기가 이동하며, 
이후 이 과정이 계속해서 반복된다.

*/

const int FISH_CNT = 16;
const int BOARD_SIZE = 4;
struct Fish
{
    bool is_alive;
    int r, c, dir;
}fishes[FISH_CNT][FISH_CNT];
struct Shark
{
    int r, c, dir;
}shark[FISH_CNT + 1];

int board[FISH_CNT + 1][BOARD_SIZE][BOARD_SIZE];//idx
int answer = 0;

int dr[9] = {0,-1, -1, 0,1,1,1,0,-1};
int dc[9] = {0,0,-1,-1,-1,0,1,1,1};

void Input()
{
    int idx, dir;
    for(int r = 0; r < BOARD_SIZE; ++r)
    {
        for(int c = 0; c < BOARD_SIZE; ++c)
        {
            cin >> idx >> dir;
            fishes[0][idx] = {true, r, c, dir};
            board[0][r][c] = idx;
        }
    }
}

void PrintBoard(int idx)
{
    for(int r = 0; r < BOARD_SIZE; ++r)
    {
        for(int c = 0; c < BOARD_SIZE; ++c)
        {
            cout << board[idx][r][c]<< " ";
        }
        cout << "\n";
    }
}

bool OutOfBoard(int r, int c)
{
    if(r < 0 || c < 0 || r>= BOARD_SIZE || c >= BOARD_SIZE)
    {
        return true;
    }
    return false;
}

void CopyBoardFromAToB(int a, int b)
{
    for(int r = 0; r<BOARD_SIZE; ++r)
    {
        for(int c = 0; c< BOARD_SIZE; ++c)
        {
            board[b][r][c] = board[a][r][c];
        }
    }
}

void MoveFish(int cnt)
{
    int n_cnt = cnt + 1;
    CopyBoardFromAToB(cnt, n_cnt);

    int shark_c, shark_r;
    shark_r = shark[cnt].r;
    shark_c = shark[cnt].c;

    int r, c, dir;
    int nr, nc, ndir;
    int curr;
    for(int i = 1; i<= FISH_CNT; ++i)
    {
        //if the fish is not alive, skip the fish
        if(!fishes[cnt][i].is_alive)
        {
            continue;
        }

        r = fishes[cnt][i].r;
        c = fishes[cnt][i].c;
        dir = fishes[cnt][i].dir;
        ndir = dir;

        //rotate direction
        for(int d = 0; d < 8; ++d)
        {
            nr = r + dr[ndir];
            nc = c + dc[ndir];
            curr = board[n_cnt][nr][nc];
            
            //can go empty, other fish
            if(OutOfBoard(nr,nc) || (nr == shark_r && nc == shark_c))
            {
                //cannot go this way, so need to update direction
                ndir++;
                if(ndir > 8)
                {
                    ndir = 1;
                }
                continue;
            }
            
            if(curr == 0)
            {
                //empty space, just move
                board[n_cnt][nr][nc] = i;
                fishes[n_cnt][i] = { true,nr,nc,ndir};
            }
            else
            {
                //there is another fish, need to swap
                swap(board[n_cnt][nr][nc], board[n_cnt][r][c]);
                swap(fishes[n_cnt][i], fishes[n_cnt][curr]);
            }
            
            break;
        }
        
    }
}

void Simulation(int cnt, int amt)
{
    answer = max(answer, amt);

    //1. move fish
    MoveFish(cnt);

    //2. move shark
    int dir, nr, nc, idx;
    nr = shark[cnt].r;
    nc = shark[cnt].c;
    dir = shark[cnt].dir;
    for(int d = 1; d < BOARD_SIZE; ++d)
    {
        nr += dr[dir];
        nc += dc[dir];

        //Skip out of board 
        if(OutOfBoard(nr,nc))
        {
            continue;
        }

        idx = board[cnt][nr][nc];
        //Skip when there is no fish in the board
        if(idx == 0)
        {
            continue;
        }
        
        //3. shark eats fish
        shark[cnt + 1] = {nr, nc, fishes[cnt][idx].dir};
        Simulation(cnt + 1, amt + idx);
    }
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);

    Input();
    
    //1. shark eats fish at board[0][0]
    int idx;
    idx = board[0][0][0];
    answer += idx;

    fishes[0][idx].is_alive = false;
    board[0][0][0] = 0;

    Simulation(0, answer);

    return 0;
}