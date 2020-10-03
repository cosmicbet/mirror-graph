import { Repository } from 'typeorm'
import { getHistoryRangeValues } from 'lib/time'
import { HistoryRanges } from 'types'
import { AssetOHLC, PriceAt } from 'graphql/schema'

export async function getOHLC<T>(repo: Repository<T>, token: string, from: number, to: number): Promise<AssetOHLC> {
  const ohlc = await repo
    .createQueryBuilder()
    .select('(array_agg(open ORDER BY datetime ASC))[1]', 'open')
    .addSelect('MAX(high)', 'high')
    .addSelect('MIN(low)', 'low')
    .addSelect('(array_agg(close ORDER BY datetime DESC))[1]', 'close')
    .where('token = :token', { token })
    .andWhere('datetime BETWEEN :from AND :to', { from: new Date(from), to: new Date(to) })
    .getRawOne()

  return new AssetOHLC({ ...ohlc, from, to })
}

export async function getHistory<T>(repo: Repository<T>, token: string, range: HistoryRanges): Promise<PriceAt[]> {
  const to = Date.now()
  const { from, interval } = getHistoryRangeValues(to, range)

  const prices = await repo
    .createQueryBuilder()
    .select(['datetime', 'close'])
    .where('token = :token', { token })
    .andWhere('datetime BETWEEN :from AND :to', { from: new Date(from), to: new Date(to) })
    .andWhere("int4(date_part('minute', datetime)) % :interval = 0", { interval })
    .getRawMany()

  return prices.map((price) => ({
    timestamp: new Date(price.datetime).getTime(), price: price.close
  }))
}
