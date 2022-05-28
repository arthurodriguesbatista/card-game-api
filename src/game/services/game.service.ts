import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Page } from '../dtos/page.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args?: Prisma.GameFindManyArgs) {
    const entities = await this.prisma.game.findMany({ ...args });
    const totalCount = await this.prisma.game.count({
      where: args.where,
    });

    return Page.of(entities, totalCount);
  }

  async findOne(id: number, include?: Prisma.GameInclude) {
    return this.prisma.game.findFirst({
      where: { id, deletedAt: null },
      include,
    });
  }

  async delete(id: number) {
    return this.prisma.game.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async create(playerName: string, name: string) {
    const deck = await this.prisma.card.findMany();
    return this.prisma.game.create({
      data: {
        name,
        players: {
          create: {
            name: playerName,
          },
        },
        shoe: {
          createMany: { data: deck.map((card) => ({ cardId: card.id })) },
        },
      },
    });
  }

  async shuffle(id: number) {
    const shoe = await this.prisma.deckCard.findMany({ where: { gameId: id } });
    const randomizedShoe = shoe.sort(() => Math.random() - 0.5);
    Promise.all(
      randomizedShoe.map((card, index) =>
        this.prisma.deckCard.update({
          where: { id: card.id },
          data: { order: index },
        }),
      ),
    );
    return this.prisma.deckCard.findMany({ where: { gameId: id } });
  }

  async addDeck(id: number) {
    const deck = await this.prisma.card.findMany();
    return await this.prisma.deckCard.createMany({
      data: deck.map((card) => ({ gameId: id, cardId: card.id })),
    });
  }
}
