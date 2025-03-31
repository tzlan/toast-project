import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
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
    field: 'user_id',
  })
  userId!: string;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user!: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'description',
  })
  description!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'date',
  })
  date!: Date;

  @Column({
    type: DataType.ENUM('CANCELED', 'DELAYED', 'ON TIME'),
    allowNull: false,
    field: 'status_of_toast',
  })
  statusToast!: 'CANCELED' | 'DELAYED' | 'ON TIME';

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'place',
  })
  place!: string;
}
