import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface DocumentTypesAttributes {
    id_document_type: number;
    name: string;
    is_active: boolean;
}

class DocumentType extends Model<DocumentTypesAttributes> implements DocumentTypesAttributes {
    public id_document_type!: number;
    public name!: string;
    public is_active!: boolean;
}

DocumentType.init(
    {
        id_document_type: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
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
        modelName: 'DocumentType',
        tableName: 'document_types',
        timestamps: false,
    }
)

export default DocumentType;