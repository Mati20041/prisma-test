import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {

  const result = await prisma.books.findMany({
    select: {
      name: true,
      Lendings: {
        orderBy: {
          id: 'desc',
        },
        take: 1,
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

// Process the result to match the SQL query output
  const processedResult = result.map(book => ({
    name: book.name,
    username: book.Lendings[0]?.user.name ?? null,
  }));

  console.log(processedResult);
}
main()
