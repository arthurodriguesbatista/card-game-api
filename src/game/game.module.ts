import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GameController } from './game.controller';
import { DeckService } from './services/deck.service';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';

@Module({
  imports: [PrismaModule],
  controllers: [GameController],
  providers: [DeckService, PlayerService, GameService],
})
export class GameModule {}
