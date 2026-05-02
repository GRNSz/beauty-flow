import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Barbearia {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  endereco!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  telefone!: string;

  @Column({ type: 'float', nullable: false })
  precoCorte!: number;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

}
