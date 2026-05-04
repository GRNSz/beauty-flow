import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

//TODO - Não expor senha nas respostas da API (ex: usando class-transformer + @Exclude para excluir o campo senha ou criando um DTO específico para respostas)

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int'})
  id!: number;
  
  @Column({ type: 'varchar', length: 255, nullable: false})
  nome!: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  telefone!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email!: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: false })
  senha!: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}