import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-game',
  templateUrl: './match-game.component.html',
  styleUrls: ['./match-game.component.css']
})
export class MatchGameComponent implements OnInit {

  emojiList = ["❤️", "✨", "🔥", "🎃", "✔️", "😀", "😅", "😂", "😇", "🙂", "🙃", "😍", "😛", "🤪", "😎", "🥸", "🤩", "🥳", "😭", "😡", "🤯", "😳", "🥶", "😱"]
  grid: string[][] = [];
  flipped: boolean[][] = [];
  matches: boolean[][] = [];
  flippedCards: number[][] = [];
  gridSize = 4;
  score: number = 0;


  constructor() { }

  ngOnInit(): void {
    this.createMatrix();
  }

  shuffleArray(arr: string[]) {
    arr.sort(() => Math.random() - 0.5);
  }

  createMatrix(): void {
    this.grid = [];
    this.flipped = [];
    this.matches = [];
    this.score = 0;
    var cutEmojiList = this.emojiList.slice(0, this.gridSize * 2);
    cutEmojiList = cutEmojiList.concat(cutEmojiList);
    this.shuffleArray(cutEmojiList);
    while (cutEmojiList.length > 0) {
      this.grid.push(cutEmojiList.splice(0, this.gridSize));
      this.flipped.push(Array(this.gridSize).fill(false));
      this.matches.push(Array(this.gridSize).fill(false));
    }
  }

  flipCard(i: number, j: number): void {
    if (this.flipped[i][j] || this.flippedCards.length == 2) return;
    this.flipped[i][j] = true;
    this.flippedCards.push([i, j]);
    if (this.flippedCards.length == 2) {
      setTimeout(() => {
        if (this.grid[this.flippedCards[0][0]][this.flippedCards[0][1]] != this.grid[this.flippedCards[1][0]][this.flippedCards[1][1]]) {
          this.flipped[this.flippedCards[0][0]][this.flippedCards[0][1]] = false;
          this.flipped[this.flippedCards[1][0]][this.flippedCards[1][1]] = false;
          this.score -= 1;
        }
        else {
          this.matches[this.flippedCards[0][0]][this.flippedCards[0][1]] = true;
          this.matches[this.flippedCards[1][0]][this.flippedCards[1][1]] = true;
          this.score += 2;
        }
        this.flippedCards = [];
      }, 1000);
    }
  }

  setGridSize(): void{
    //this.gridSize = parseFloat(document.getElementById("gSize")!.innerHTML);;
  }

}
