import {
  Column,
  Model,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'toasts', paranoid: true })
export class Toast extends Model<Toast> {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user!: User;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  date!: Date;

  @Column({
    type: DataTypes.ENUM('CANCELED', 'DELAYED', 'ON TIME'),
    allowNull: false,
  })
  toastStatus!: 'CANCELED' | 'DELAYED' | 'ON TIME';

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  place!: string;
}
