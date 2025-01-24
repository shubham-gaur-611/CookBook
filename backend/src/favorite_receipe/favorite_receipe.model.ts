import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'favorite-receipe',
  timestamps: true,
})
export class Favorite_Receipe extends Model<Favorite_Receipe> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  receip_id: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   receip_name: string;

//   @Column({
//     type: DataType.STRING(1000),
//     allowNull: false,
//   })
//   instructions: string;

//   @Column({
//     type: DataType.STRING(1000),
//     allowNull: false,
//   })
//   ingredients: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   receip_image: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   posted_by: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   private_receipe: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  favorite_by: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
