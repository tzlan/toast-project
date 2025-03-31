import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';


@Table({ tableName: 'users', paranoid: true })
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: true,
  })
  soldierId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password?: string;

  @Column({
    type: DataType.ENUM('CRIMINAL', 'LEGIT', 'PERSONA_NON_GRATA'),
    allowNull: true,
  })
  status?: 'CRIMINAL' | 'LEGIT' | 'PERSONA_NON_GRATA';

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isAdmin!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isStatusForced!: boolean;
}
