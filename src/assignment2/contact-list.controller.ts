import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import { Update } from 'aws-sdk/clients/dynamodb';
import { Response } from 'express';
import { ContactListService } from './contact-list.service';
import { ICreateContact } from './dto/create.contact.dto';
import { ICreateGroup } from './dto/create.group.dto';
import { IEditContact } from './dto/edit.contact.dto';
import { IEditGroup } from './dto/edit.group.dto';
import { IDetailContact } from './dto/get.detail.contact.dto';
import { Contact } from './entity/contact.entity';
import { Group } from './entity/group.entity';

@Controller('contact-list')
export class ContactListController {
    constructor(private readonly contactListService: ContactListService) { }

    @Post('/group/create')
    async createNewGroup(@Res() res: Response, @Body() arg: ICreateGroup) {
        const result: Group = await this.contactListService.createGroup(arg);
        return res.status(HttpStatus.CREATED).json(result);
    }

    @Get('/group')
    async findGroup(@Res() res: Response) {
        const result: Group[] = await this.contactListService.getAllGroup();
        return res.status(HttpStatus.OK).json(result);
    }

    @Put('/group/delete/:id')
    async deleteAnGroup(@Res() res: Response, @Param('id') id: string) {
        await this.contactListService.deleteGroup(id);
        return res.sendStatus(HttpStatus.NO_CONTENT);
    }

    @Put('/group/edit')
    async editGroup(@Res() res: Response, @Body('') arg: IEditGroup) {
        await this.contactListService.updateGroup(arg);
        return res.sendStatus(HttpStatus.NO_CONTENT);
    }

    @Get('group/:id/contact/')
    async findContact(@Res() res: Response, @Param('id') id: string) {
        const result: Contact[] =
            await this.contactListService.getConatactByGroupId(id);
        return res.status(HttpStatus.OK).json(result);
    }

    @Post('/contact/create')
    async createNewContact(@Res() res: Response, @Body() arg: ICreateContact) {
        const result: Contact = await this.contactListService.createContact(arg);
        return res.status(HttpStatus.CREATED).json(result);
    }

    @Get('/contact/:id')
    async getOneContact(@Res() res: Response, @Param('id') id: string) {
        const result: IDetailContact = await this.contactListService.getContactById(
            id,
        );
        return res.status(HttpStatus.CREATED).json(result);
    }

    @Put('/contact/edit')
    async editContact(@Res() res: Response, @Body('') arg: IEditContact) {
        await this.contactListService.updateContact(arg);
        return res.sendStatus(HttpStatus.NO_CONTENT);
    }

    @Put('/contact/delete/:id')
    async deleteAnContact(@Res() res: Response, @Param('id') id: string) {
        await this.contactListService.deleteContact(id);
        return res.sendStatus(HttpStatus.NO_CONTENT);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(
        @UploadedFile() image: Express.Multer.File,
        @Res() res: Response,
    ) {
        const result: string = await this.contactListService.uploadImage(image);
        return res.status(HttpStatus.OK).json({ url: result });
    }

    @Get('/images/:name')
    async getImageFile(@Res() res: Response, @Param('name') name: string) {
        const result: S3.Body = await this.contactListService.getFile(name);
        return res.contentType('image/jpeg').send(result);
    }
}
