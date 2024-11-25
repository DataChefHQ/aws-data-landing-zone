export enum DatabaseAction {
  DESCRIBE = 'DESCRIBE',
  ALTER = 'ALTER',
  DROP = 'DROP',
  CREATE_TABLE = 'CREATE_TABLE'
}

export enum TableAction {
  DESCRIBE = 'DESCRIBE',
  SELECT = 'SELECT',
  DELETE = 'DELETE',
  INSERT = 'INSERT',
  DROP = 'DROP',
  ALTER = 'ALTER'
}

export enum TagAction {
  DESCRIBE = 'DESCRIBE',
  ASSOCIATE = 'ASSOCIATE',
  ALTER = 'ALTER',
  DROP = 'DROP'
}

export type TagActionExternal = Exclude<TagAction, 'ALTER' | 'DROP'>