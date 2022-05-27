import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Page } from '../dtos/page.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args?: Prisma.GameFindManyArgs) {
    const entities = await this.prisma.game.findMany(args);
    const totalCount = await this.prisma.game.count({
      where: args.where,
    });

    return Page.of(entities, totalCount);
  }

  async findOne(id: number, include?: Prisma.GameInclude) {
    return this.prisma.game.findUnique({ where: { id }, include });
  }

  async delete(id: number) {
    return this.prisma.game.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async create(playersName: string[], name: string) {
    const deck = await this.prisma.card.findMany();
    return this.prisma.game.create({
      data: {
        name,
        players: {
          createMany: {
            data: playersName.map((playerName) => ({
              name: playerName,
            })),
          },
        },
        shoe: {
          createMany: { data: deck.map((card) => ({ cardId: card.id })) },
        },
      },
    });
  }
}
