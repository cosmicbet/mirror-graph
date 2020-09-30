import { TxInfo, TxLog, MsgExecuteContract } from '@terra-money/terra.js'
import { EntityManager } from 'typeorm'
import { AssetEntity, ContractEntity } from 'orm'
import { findAttributes, findAttribute } from 'lib/terra'
import * as logger from 'lib/logger'
import { ContractType } from 'types'

export async function parse(
  manager: EntityManager, txInfo: TxInfo, msg: MsgExecuteContract, log: TxLog, contract: ContractEntity
): Promise<void> {
  const { execute_msg: executeMsg } = msg

  if (executeMsg['whitelist']) {
    const attributes = findAttributes(log.events, 'from_contract')
    const symbol = findAttribute(attributes, 'symbol') || ''
    const name = findAttribute(attributes, 'name') || ''
    const token = findAttribute(attributes, 'asset_token')
    const pair = findAttribute(attributes, 'pair_contract_addr')
    const lpToken = findAttribute(attributes, 'liquidity_token_addr')
    const govId = contract.govId

    if (!token || !pair || !lpToken) {
      throw new Error(`whitelist parsing failed. token(${token}), lpToken(${lpToken}), pair(${pair})`)
    }

    const asset = new AssetEntity({ govId, symbol, name, token, pair, lpToken })

    await manager.save([
      asset,
      new ContractEntity({ address: token, type: ContractType.TOKEN, govId, asset }),
      new ContractEntity({ address: pair, type: ContractType.PAIR, govId, asset }),
      new ContractEntity({ address: lpToken, type: ContractType.LP_TOKEN, govId, asset }),
    ])

    logger.info(`whitelisting: ${symbol}`)
  }
}
