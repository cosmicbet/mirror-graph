import { findAttributes, findAttribute } from 'lib/terra'
import { TxEntity } from 'orm'
import { TxType } from 'types'
import { ParseArgs } from './parseArgs'

export async function parse(
  { manager, height, txHash, timestamp, sender, msg, log, contract }: ParseArgs
): Promise<void> {
  const attributes = findAttributes(log.events, 'from_contract')
  let parsed = {}

  if (msg['bond'] || msg['unbond']) {
    const amount = findAttribute(attributes, 'amount')
    const assetToken = findAttribute(attributes, 'asset_token')

    parsed = {
      type: msg['bond'] ? TxType.STAKE : TxType.UNSTAKE,
      data: { assetToken, amount },
      token: assetToken,
    }
  } else {
    return
  }

  const { govId } = contract
  const datetime = new Date(timestamp)

  const tx = new TxEntity({
    ...parsed, height, txHash, address: sender, datetime, govId, contract
  })
  await manager.save(tx)
}
