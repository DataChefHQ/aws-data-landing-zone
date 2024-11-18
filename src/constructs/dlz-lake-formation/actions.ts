export type TagAction = 'DESCRIBE' | 'ALTER' | 'ASSOCIATE' | 'DROP';
export type DatabaseAction = 'DESCRIBE' | 'ALTER' | 'DROP' | 'CREATE_TABLE';
export type TableAction = 'DESCRIBE' | 'SELECT' | 'DELETE' | 'INSERT' | 'DROP' | 'ALTER';

type ResourcePermissionsMap = {
  TAG: TagAction;
  DATABASE: DatabaseAction;
  TABLE: TableAction;
};

export type PermissionsForResource<T extends 'TAG' | 'DATABASE' | 'TABLE'> = ResourcePermissionsMap[T];