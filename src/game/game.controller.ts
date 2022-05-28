import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GameService } from './services/game.service';
import { CreateGameDTO } from './dtos/create-game.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dtos/pagination.dto';
import { PlayerService } from './services/player.service';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { DeckService } from './services/deck.service';

@Controller('game')
@ApiTags('Game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
    private readonly deckService: DeckService,
  ) {}

  @Post()
  async create(@Body() createGameDTO: CreateGameDTO) {
    return this.gameService.create(
      createGameDTO.playerName,
      createGameDTO.name,
    );
  }

  @Get()
  async findAll(
    @Query()
    {
      skip,
      take,
      orderBy,
      include,
      where = {},
    }: PaginationDto<
      Prisma.GameWhereInput,
      Prisma.Enumerable<Prisma.GameOrderByWithRelationInput>,
      Prisma.GameInclude
    >,
  ) {
    return this.gameService.findMany({
      skip,
      take,
      include,
      where: {
        ...where,
        deletedAt: null,
      },
      orderBy,
    });
  }

  @Get(':id')
  async findOne(@Param('id') gameId: number) {
    return this.gameService.findOne(gameId, {
      players: { include: { deckCards: { include: { card: true } } } },
      shoe: { where: { playerId: null }, include: { card: true } },
    });
  }
  @Delete(':id')
  async delete(@Param('id') gameId: number) {
    return this.gameService.delete(gameId);
  }

  @Post(':id/player')
  async addPlayerToGame(
    @Param('id') gameId: number,
    @Body() createPlayerDTO: CreatePlayerDTO,
  ) {
    return this.playerService.addPlayerToGame(
      gameId,
      createPlayerDTO.playerName,
    );
  }

  @Delete(':id/player/:playerId')
  async deletePlayerFromGame(
    @Param('id') gameId: number,
    @Param('playerId') playerId: number,
  ) {
    await this.playerService.deletePlayerFromGame(gameId, playerId);
  }

  @Post(':id/player/:playerId/card/:cardId')
  async addCardToPlayerHand(
    @Param('playerId') playerId: number,
    @Param('cardId') cardId: number,
  ) {
    return this.deckService.addCardToPlayerHand(playerId, cardId);
  }
}
