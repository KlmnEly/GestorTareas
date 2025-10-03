import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface UsersAttributes {
    id_user: number;
    access_id?: number;
    document_type_id: number;
    fullname: string;
    document_number: string;
    email: string;
    is_active: boolean;
}

class User extends Model<UsersAttributes> implements UsersAttributes {
    public id_user!: number;
    public access_id?: number;
    public document_type_id!: number;
    public fullname!: string;
    public document_number!: string
    public email!: string;
    public is_active!: boolean;
}

User.init(
    {
        id_user: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        access_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'accesses',
                key: 'id_access',
            },
        },
        document_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'document_types',
                key: 'id_document_type',
            },
        },
        fullname: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        document_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
    }
)

export default User;