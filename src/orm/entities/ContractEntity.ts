import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm'
import { GovEntity, AssetEntity } from 'orm'
import { ContractType } from 'types'

@Entity('contract')
@Index('index_contract_address_and_type_and_gov', ['address', 'type', 'gov'], { unique: true })
export class ContractEntity {
  @CreateDateColumn()
  createdAt: Date

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  address: string

  @Column({ type: 'enum', enum: ContractType })
  type: ContractType

  @OneToOne((type) => ContractEntity, { cascade: ['remove'] })
  @JoinColumn()
  asset: AssetEntity

  @ManyToOne((type) => GovEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  gov: GovEntity
}
