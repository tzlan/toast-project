import {
  Column,
  Model,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table({ tableName: 'toasts', paranoid: true })
export class Toast extends Model<Toast> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user!: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  place!: string;

  @Column({
    type: DataType.ENUM('CANCELED', 'DELAYED', 'ON TIME'),
    allowNull: false,
    defaultValue: 'ON TIME',
  })
  toastStatus!: 'CANCELED' | 'DELAYED' | 'ON TIME';

  year?: number;
  period?: string;
  count?: number;
}
