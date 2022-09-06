import { Repository } from 'typeorm';
import { Shop } from './shop.entity';
export declare class ShopService {
    private shopRepository;
    constructor(shopRepository: Repository<Shop>);
    findAll(): Promise<Shop[]>;
    findOne(id: number): Promise<Shop>;
    remove(id: string): Promise<void>;
    getHello(): string;
}
