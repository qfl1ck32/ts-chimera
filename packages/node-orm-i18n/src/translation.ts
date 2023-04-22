import { Entity, PrimaryGeneratedColumn, Column } from '@ts-phoenix/node-orm';

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  locale!: string;

  @Column()
  value!: string;

  @Column({ nullable: true })
  fieldName!: string;
}
