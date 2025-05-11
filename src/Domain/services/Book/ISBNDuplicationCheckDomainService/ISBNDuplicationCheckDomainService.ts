import { BookId } from 'Domain/models/Book/BookId/BookId'
// import { PrismaClient } from '@prisma/client'
import { IBookRepository } from 'Domain/models/Book/IBookRepository'

// リポジトリを適用せずに実装
// const prisma = new PrismaClient()
// export class ISBNDuplicationCheckDomainService {
//   async execute(isbn: BookId): Promise<boolean> {
//     // データベースに問い合わせて重複があるか確認する
//     const duplicateISBNBook = await prisma.book.findUnique({
//       where: {
//         bookId: isbn.value,
//       },
//     })

//     const isDuplicateISBN = duplicateISBNBook !== null

//     return isDuplicateISBN
//   }
// }

// リポジトリを適用するように変更
export class ISBNDuplicationCheckDomainService {
  constructor(private bookRepository: IBookRepository) {}

  async execute(isbn: BookId): Promise<boolean> {
    // データベースに問い合わせて重複があるか確認する
    const duplicateISBNBook = await this.bookRepository.find(isbn)
    const isDuplicateISBN = !!duplicateISBNBook

    return isDuplicateISBN
  }
}
