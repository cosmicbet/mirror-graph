import { TxInfo, MsgExecuteContract, TxLog } from '@terra-money/terra.js'
import { EntityManager } from 'typeorm'
import { Container } from 'typedi'
import { ContractService } from 'services'
import { ContractType } from 'types'
import { MirrorParser } from './MirrorParser'
import { OracleParser } from './OracleParser'
// import { TokenParser } from './TokenParser'
// import { MintParser } from './MintParser'
// import { StakingParser } from './StakingParser'
import { FactoryParser } from './FactoryParser'

const parser: { [type: string]: MirrorParser } = {
  // [ContractType.MINT]: new MintParser(),
  [ContractType.ORACLE]: new OracleParser(),
  // [ContractType.TOKEN]: new TokenParser(),
  // [ContractType.LP_TOKEN]: new TokenParser(),
  // [ContractType.STAKING]: new StakingParser(),
  [ContractType.FACTORY]: new FactoryParser(),
}

export async function parseMirrorMsg(
  manager: EntityManager, txInfo: TxInfo, msg: MsgExecuteContract, msgIndex: number, log: TxLog
): Promise<boolean> {
  const contractService = Container.get(ContractService)
  const contract = await contractService.get(
    { address: msg.contract },
    { relations: ['asset'] }
  )

  if (!contract || !parser[contract.type]) {
    return false
  }

  return parser[contract.type].parse(manager, txInfo, msg, msgIndex, log, contract)
}
