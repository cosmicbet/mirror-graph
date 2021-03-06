import { Repository, FindConditions, FindOneOptions, FindManyOptions } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Container, Service } from 'typedi'
import { ContractEntity } from 'orm'

@Service()
export class ContractService {
  constructor(
    @InjectRepository(ContractEntity) private readonly repo: Repository<ContractEntity>
  ) {}

  async get(
    conditions: FindConditions<ContractEntity>,
    options?: FindOneOptions<ContractEntity>,
    repo = this.repo
  ): Promise<ContractEntity> {
    if (!conditions.gov && !conditions.asset && !conditions.address) {
      throw new Error('conditions must have gov or asset')
    }
    return repo.findOne(conditions, options)
  }

  async find(
    options?: FindManyOptions<ContractEntity>,
    repo = this.repo
  ): Promise<ContractEntity[]> {
    return repo.find(options)
  }
}

export function contractService(): ContractService {
  return Container.get(ContractService)
}
