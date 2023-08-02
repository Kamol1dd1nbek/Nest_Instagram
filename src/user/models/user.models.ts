import { Model, DataType, Table, Column } from 'sequelize-typescript';
import { ApiTags, ApiProperty } from '@nestjs/swagger';

class UserAttr {
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  hashed_password: string;
}

@ApiTags('Users')
@Table({ tableName: 'user' })
export class User extends Model<User, UserAttr> {

  @ApiProperty({ example: 1, description: '| Unique user id' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Anvar', description: '| User firstname' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Sanayev', description: '| User lastname' })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: 'anvarc1k', description: '| Unique username' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @ApiProperty({ example: '+998991234567', description: '| User phone' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: 'qwer', description: '| User password' })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;
}
