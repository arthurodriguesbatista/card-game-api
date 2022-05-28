import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DeckService {
  constructor(private readonly prisma: PrismaService) {}

  async returnPlayerCardsToShoe(playerId: number) {
    await this.prisma.playerCard.deleteMany({
      where: { playerId },
    });
  }

  async addCardToPlayerHand(playerId: number, cardId: number) {
    return this.prisma.playerCard.create({
      data: { playerId, deckCardId: cardId },
    });
  }
}
