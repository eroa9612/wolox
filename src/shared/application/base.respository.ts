export interface GenericRepository<T> {
  list(): Promise<T>;
  insert(entity: T): Promise<T>;
  //insert(user: UserModel): UserModel;
}
