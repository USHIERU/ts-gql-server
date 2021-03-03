interface InterfaceDAO<T = any> {
    create(DTO: T): Promise<T>;
    read(): Promise<T[]>;
    update(id: string, DTO: T): Promise<boolean>;
    delete(DTO: T): Promise<boolean>;
}

export default InterfaceDAO;