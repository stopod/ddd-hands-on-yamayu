import { injectable, inject } from 'tsyringe'
import { ITransactionManager } from '../../Application/shared/ITransactionManager'
import prisma from './prismaClient'
import { PrismaClientManager } from './PrismaClientManager'

// 依存関係として DI されるクラスに @injectable() デコレータを適用
@injectable()
export class PrismaTransactionManager implements ITransactionManager {
  constructor(
    // コンストラクタインジェクションする引数に @inject('Interface')デコレータを適用
    @inject('IDataAccessClientManager')
    private clientManager: PrismaClientManager,
  ) {}

  async begin<T>(callback: () => Promise<T>): Promise<T | undefined> {
    return await prisma.$transaction(async (transaction) => {
      this.clientManager.setClient(transaction)

      const res = await callback()
      // リセット
      this.clientManager.setClient(prisma)

      return res
    })
  }
}
