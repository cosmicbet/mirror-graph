import { ObjectType, Field } from 'type-graphql'
import { AssetPositions, AssetPrices, AssetStatistic } from 'graphql/schema'

@ObjectType({ simpleResolvers: true })
export class Asset {
  @Field()
  symbol: string

  @Field()
  name: string

  @Field()
  token: string

  @Field()
  pair: string

  @Field()
  lpToken: string

  @Field((type) => AssetPositions)
  positions: AssetPositions

  @Field((type) => AssetPrices, { nullable: true })
  prices?: AssetPrices

  @Field((type) => AssetStatistic, { nullable: true })
  statistic?: AssetStatistic
}
