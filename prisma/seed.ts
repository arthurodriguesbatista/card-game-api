import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const logger = new Logger('PrismaSeed');

async function createCards() {
  const suits = ['HEARTS', 'SPADES', 'CLUBS', 'DIAMONDS'];
  const faceValues = [
    { face: 'ACE', value: 1 },
    { face: '2', value: 2 },
    { face: '3', value: 3 },
    { face: '4', value: 4 },
    { face: '5', value: 5 },
    { face: '6', value: 6 },
    { face: '7', value: 7 },
    { face: '8', value: 8 },
    { face: '9', value: 9 },
    { face: '10', value: 10 },
    { face: 'JACK', value: 11 },
    { face: 'QUEEN', value: 12 },
    { face: 'KING', value: 13 },
  ];
  const cards = suits.flatMap((suit) =>
    faceValues.map((faceValue) => ({
      face: faceValue.face,
      value: faceValue.value,
      imageUrl: `${process.env.BASE_URL}/public/${
        faceValue.face + '_' + suit
      }.png`,
      suit,
    })),
  );
  await prisma.card.createMany({ data: cards });
}

async function main() {
  await createCards();
}

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
