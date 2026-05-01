import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int'})
  id!: number;
  
  @Column({ type: 'varchar', length: 255, nullable: false})
  nome!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  senha!: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;
}