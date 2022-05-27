import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DeckService } from './deck.service';

@Injectable()
export class PlayerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly deckService: DeckService,
  ) {}

  async addPlayerToGame(gameId: number, playerName: string) {
    return this.prisma.player.create({
      data: {
        name: playerName,
        gameId,
      },
    });
  }

  async deletePlayerFromGame(gameId: number, playerId: number) {
    await this.deckService.returnPlayerCardsToShoe(playerId);
    return this.prisma.game.update({
      where: { id: gameId },
      data: {
        players: {
          delete: { id: playerId },
        },
      },
    });
  }
}
