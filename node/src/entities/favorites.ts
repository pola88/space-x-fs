import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Users } from "./users";

@Entity()
@Index(["user_id", "flight_number"], { unique: true })
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  flight_number: number;

  @Index()
  @Column({ nullable: false })
  user_id: number;

  @ManyToOne(() => Users, (user) => user.favorites)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @CreateDateColumn()
  created_at: Date;
}
