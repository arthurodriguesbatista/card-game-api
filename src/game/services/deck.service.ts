import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DeckService {
  constructor(private readonly prisma: PrismaService) {}

  async returnPlayerCardsToShoe(playerId: number) {
    await this.prisma.deckCard.updateMany({
      where: { playerId },
      data: { playerId: null },
    });
  }

  async addCardToPlayerHand(playerId: number, cardId: number) {
    return this.prisma.deckCard.update({
      where: { id: cardId },
      data: { playerId },
    });
  }
}
