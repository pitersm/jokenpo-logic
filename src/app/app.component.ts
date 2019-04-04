import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JoKenPo';
  gameCount = 1;
  inputCount = 1;
  tournament: string[][][] = [[['', ''], ['', '']]];
  validPlays = ['R', 'S', 'P', 'R', 'S'];
  types: SelectItem[];

  @ViewChild('quantity') quantity: any;

  constructor(private messageService: MessageService) {
    this.types = [
      { label: 'Pedra', value: 'R' },
      { label: 'Tesoura', value: 'S' },
      { label: 'Papel', value: 'P' }
    ];
  }

  doSingleGame() {
    const winner = this.rpsGameWinner(this.tournament[0]);

    if (!winner[0]) {
      winner[0] = 'Unnamed';
    }

    this.messageService.add({
      key: 'msg',
      severity: 'sucess',
      summary: 'Jogo encerrado',
      detail: `O vencedor do jogo é: ${winner[0]} (${this.translatePlay(winner[1])})`
    });
    return false;
  }

  setTournamentForm() {
    if (!this.multipleOfTwo(this.inputCount) || this.inputCount <= 0) {
      this.messageService.add({
        key: 'msg',
        severity: 'error',
        summary: 'Quantidade inválida',
        detail: 'A quantidade de jogos deve ser um número múltiplo de 2 e maior que zero. '
      });
      return;
    }

    this.tournament = [];
    for (let i = 0; i < this.inputCount; i++) {
      this.tournament.push([['', ''], ['', '']]);
    }
    this.gameCount = this.inputCount;
  }

  multipleOfTwo(number: number): boolean {
    let isMultiple = true;
    for (let i = number; i > 1; i /= 2) {
      if (i % 2 !== 0) {
        isMultiple = false;
        break;
      }
    }
    return isMultiple;
  }

  doTournamentGame() {
    const winner = this.rpsTournamentWinner(this.tournament);

    if (!winner[0]) {
      winner[0] = 'Unnamed';
    }

    this.messageService.add({
      key: 'msg',
      severity: 'sucess',
      summary: 'Jogo encerrado',
      detail: `O vencedor do torneio é: ${winner[0]} (${this.translatePlay(winner[1])})`
    });
  }

  translatePlay(play: string): string {
    let playText: string;
    switch (play) {
      case 'S':
        playText = 'Tesoura';
        break;
      case 'P':
        playText = 'Papel';
        break;
      case 'R':
        playText = 'Pedra';
        break;
    }
    return playText;
  }

  rpsTournamentWinner(games: any[][2][2]) {
    if (games.length === 1) {
      return this.rpsGameWinner(games[0]);
    } else {
      const wonGames: any[] = [];
      for (let i = 0; i < games.length; i += 2) {
        const winnerA = this.rpsGameWinner(games[i]);
        const winnerB = this.rpsGameWinner(games[i + 1]);
        wonGames.push([winnerA, winnerB]);
      }
      return this.rpsTournamentWinner(wonGames);
    }
  }

  rpsGameWinner(game: string[][]): string[] {
    if (!this.validGame(game)) {
      return;
    }

    return this.determineWinner(game);
  }

  determineWinner(game: string[][]): string[] {
    const playA = game[0][1], playB = game[1][1];
    const playerAIndex = this.validPlays.findIndex((p1) => p1 === playA);
    let count = 0;

    for (let i = playerAIndex; this.validPlays[i] !== playB; i++) {
      count++;
    }

    if (count < 2) {
      return game[0];
    } else {
      return game[1];
    }
  }


  validGame(game: any[]): boolean {
    if (game.length !== 2) {
      this.messageService.add({
        key: 'msg',
        severity: 'error',
        summary: 'Erro na entrada',
        detail: 'O número de jogadores do jogo deve ser igual a 2.'
      });
      return false;
    }

    if (!this.validPlays.find((p) => p === game[0][1]) || !this.validPlays.find((p2) => p2 === game[1][1])) {
      this.messageService.add({
        key: 'msg',
        severity: 'error',
        summary: 'Erro na entrada',
        detail: 'A jogada informada é inválida.'
      });
      return false;
    }
    return true;
  }
}
