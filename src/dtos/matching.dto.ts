import { IsString, IsNumber, ValidateNested, IsArray, arrayMinSize, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class OrderDTO {
  @IsString()
  customerName: string;

  @IsString()
  type: string;

  @IsString()
  orderId: string;

  @IsString()
  date: string;

  @IsString()
  product: string;

  @IsNumber()
  price: number;
}

class TransactionDTO {
  @IsString()
  customerName: string;

  @IsString()
  type: string;

  @IsString()
  orderId: string;

  @IsString()
  date: string;

  @IsString()
  product: string;

  @IsNumber()
  price: number;

  @IsString()
  transactionType: string;

  @IsString()
  transactionDate: string;

  @IsNumber()
  transactionAmount: number;
}

export class MatchingServiceDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionDTO)
  @ArrayMinSize(1)
  transactions: TransactionDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDTO)
  @ArrayMinSize(1)
  orders: OrderDTO[];
}
