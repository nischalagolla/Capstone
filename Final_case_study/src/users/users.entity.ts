import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;
 
  @Column()
  username: string;

  @Column()
  password: string;


  @Column()
  roles: string;
}
