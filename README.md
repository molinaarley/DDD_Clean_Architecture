ffff

IF OBJECT_ID('dbo.MappingTransformationsStaticData', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.MappingTransformationsStaticData
    (
        Id                          BIGINT IDENTITY(1,1) NOT NULL CONSTRAINT PK_MappingTransformationsStaticData PRIMARY KEY,
        CategoryTypeStaticDataId    BIGINT               NOT NULL,
        InternalValue               VARCHAR(100)         NOT NULL,
        NewValue                    VARCHAR(10)          NOT NULL,
        CONSTRAINT FK_MappingTransformationsStaticData_CategoryType
            FOREIGN KEY (CategoryTypeStaticDataId)
            REFERENCES dbo.CategoryTypeStaticData(Id)
            ON DELETE CASCADE,
        -- Evita duplicados del mismo InternalValue dentro del mismo Category/Type
        CONSTRAINT UQ_Mapping_Category_Internal UNIQUE (CategoryTypeStaticDataId, InternalValue)
    );

    -- Índice útil para consultas por Category/Type a través del FK
    CREATE INDEX IX_Mapping_CategoryTypeId ON dbo.MappingTransformationsStaticData(CategoryTypeStaticDataId);
END
GO

