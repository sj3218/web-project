#include <iostream>
#include <algorithm>
#include <tuple>

using namespace std;
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

int dr[9] = { 0,-1, -1, 0,1,1,1,0,-1 };
int dc[9] = { 0,0,-1,-1,-1,0,1,1,1 };

void Input()
{
    int idx, dir;
    for (int r = 0; r < BOARD_SIZE; ++r)
    {
        for (int c = 0; c < BOARD_SIZE; ++c)
        {
            cin >> idx >> dir;
            fishes[0][idx] = { true, r, c, dir };
            board[0][r][c] = idx;
        }
    }
}

void PrintBoard(int idx)
{
    for (int r = 0; r < BOARD_SIZE; ++r)
    {
        for (int c = 0; c < BOARD_SIZE; ++c)
        {
            cout << board[idx][r][c] << " ";
        }
        cout << "\n";
    }
}

bool OutOfBoard(int r, int c)
{
    if (r < 0 || c < 0 || r >= BOARD_SIZE || c >= BOARD_SIZE)
    {
        return true;
    }
    return false;
}

void CopyBoardFromAToB(int a, int b)
{
    for (int r = 0; r < BOARD_SIZE; ++r)
    {
        for (int c = 0; c < BOARD_SIZE; ++c)
        {
            board[b][r][c] = board[a][r][c];
        }
    }
    for (int i = 1; i <= FISH_CNT; ++i)
    {
        fishes[b][i] = fishes[a][i];
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
    Fish fish;
    for (int i = 1; i <= FISH_CNT; ++i)
    {
        //if the fish is not alive, skip the fish
        if (!fishes[n_cnt][i].is_alive)
        {
            continue;
        }

        r = fishes[n_cnt][i].r;
        c = fishes[n_cnt][i].c;
        dir = fishes[n_cnt][i].dir;
        ndir = dir;

        //rotate direction
        for (int d = 0; d < 8; ++d)
        {
            nr = r + dr[ndir];
            nc = c + dc[ndir];

            //can go empty, other fish
            if (OutOfBoard(nr, nc) || (nr == shark_r && nc == shark_c))
            {
                //cannot go this way, so need to update direction
                ndir++;
                if (ndir > 8)
                {
                    ndir = 1;
                }
                continue;
            }

            curr = board[n_cnt][nr][nc];
            if (curr == 0)
            {
                //empty space, just move
                board[n_cnt][nr][nc] = i;
                board[n_cnt][r][c] = 0;
                fishes[n_cnt][i] = { true,nr,nc,ndir };
            }
            else
            {
                //there is another fish, need to swap
                swap(board[n_cnt][nr][nc], board[n_cnt][r][c]);
                fish = fishes[n_cnt][i];
                fishes[n_cnt][i].r = fishes[n_cnt][curr].r;
                fishes[n_cnt][i].c = fishes[n_cnt][curr].c;
                fishes[n_cnt][curr].r = fish.r;
                fishes[n_cnt][curr].c = fish.c;
                fishes[n_cnt][i].dir = ndir;
            }

            break;
        }

    }
}

void Simulation(int cnt, int amt)
{
    answer = max(answer, amt);
    int pre_cnt = cnt - 1;
    //1. move fish
    MoveFish(pre_cnt);

    //2. move shark
    int dir, nr, nc, idx;
    nr = shark[pre_cnt].r;
    nc = shark[pre_cnt].c;
    dir = shark[pre_cnt].dir;

    for (int d = 1; d < BOARD_SIZE; ++d)
    {
        nr += dr[dir];
        nc += dc[dir];

        //Skip out of board 
        if (OutOfBoard(nr, nc))
        {
            continue;
        }

        idx = board[cnt][nr][nc];
        //Skip when there is no fish in the board
        if (idx == 0)
        {
            continue;
        }

        //3. shark eats fish
        shark[cnt] = { nr, nc, fishes[cnt][idx].dir };
        fishes[cnt][idx].is_alive = false;
        board[cnt][nr][nc] = 0;
        Simulation(cnt + 1, amt + idx);
        /*
        
    CopyBoardFromAToB(cnt, cnt + 1);

    shark[cnt] = { nr, nc, fishes[cnt][idx].dir };
    fishes[cnt][idx].is_alive = false;
    board[cnt][nr][nc] = 0;

    Simulation(cnt + 1, amt + idx);
    */
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

    shark[0] = { 0,0,fishes[0][idx].dir };
    answer += idx;

    fishes[0][idx].is_alive = false;
    board[0][0][0] = 0;

    Simulation(1, answer);
    cout << answer;
    return 0;
}