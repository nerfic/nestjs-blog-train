import { IsString, IsArray, IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsArray()
    @IsNotEmpty()
    tags: string[];
}
