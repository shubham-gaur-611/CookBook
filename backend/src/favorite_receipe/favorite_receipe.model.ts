import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Create_Receipe } from '../create_receipe/create_receipe.model';

@Table({
  tableName: 'favorite-receipe',
  timestamps: true,
})
export class Favorite_Receipe extends Model<Favorite_Receipe> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Create_Receipe)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  receip_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  favorite_by: string;

  @BelongsTo(() => Create_Receipe)
  recipe: Create_Receipe;

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
