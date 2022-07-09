import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ICreateContact } from './dto/create.contact.dto';
import { ICreateGroup } from './dto/create.group.dto';
import { Contact } from './entity/contact.entity';
import { Group } from './entity/group.entity';
import { v4 } from 'uuid';
import { AWSError, S3 } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { IEditGroup } from './dto/edit.group.dto';
import { IDetailContact } from './dto/get.detail.contact.dto';
import { IEditContact } from './dto/edit.contact.dto';
@Injectable()
export class ContactListService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
    ) { }

    async createGroup(arg: ICreateGroup): Promise<Group> {
        const newGroup = new Group();
        newGroup.name = arg.name;
        return await this.groupRepository.save(newGroup);
    }

    async getAllGroup(): Promise<Group[]> {
        return await this.groupRepository
            .createQueryBuilder('group')
            .select(['group.id AS id', 'group.name AS name', ' SUM(contact.group) As totalContact'])
            .where('group.deletedAt is NULL')
            .leftJoin('group.contact', 'contact')
            .groupBy('id')
            .orderBy('group.id', 'ASC')
            .getRawMany();
    }

    async updateGroup(arg: IEditGroup): Promise<void> {
        const updateGroup = await this.groupRepository.createQueryBuilder('group').update({ name: arg.name }).where({ id: arg.groupId }).execute()
        if (!updateGroup.affected) {
            throw new NotFoundException(arg.groupId);
        }
    }

    async deleteGroup(id: string): Promise<void> {
        const deleteOneGroup = await this.groupRepository.softDelete(parseInt(id))
        if (!deleteOneGroup.affected) {
            throw new NotFoundException(id);
        }
    }

    async uploadImage(image: Express.Multer.File): Promise<string> {
        try {
            const type: string[] = image.originalname.split('.');
            const fileName = `${v4()}.${type[type.length - 1].toLocaleLowerCase()}`;
            const filePath: string = `images/${fileName}`;
            const bucket = process.env.AWS_BUCKET_NAME_IMAGE;
            const s3 = new S3();
            await s3.upload({
                Bucket: bucket,
                Key: fileName,
                Body: image.buffer,
            }).promise();
            return filePath
        } catch (error) {
            throw new HttpException({ status: error.status, message: error.message }, error.status)
        }
    }

    async getFile(fileName: string): Promise<S3.GetObjectOutput> {
        const s3 = new S3();
        const bucket = process.env.AWS_BUCKET_NAME_IMAGE;
        const result = await s3
            .getObject({
                Bucket: bucket,
                Key: fileName,
            })
            .promise();
        return result;
    }

    async createContact(arg: ICreateContact): Promise<Contact> {
        const group: Group = await this.groupRepository.findOne({
            where: { id: arg.groupId },
        });
        const newDate = new Date(arg.birthDate);
        const newContact: Contact = new Contact();
        newContact.firstName = arg.firstName;
        newContact.lastName = arg.lastName;
        newContact.birthDate = newDate;
        newContact.phone = arg.phone;
        newContact.email = arg.email;
        newContact.url = arg.url;
        newContact.logo = arg.logo;
        newContact.group = group;
        return await this.contactRepository.save(newContact);
    }

    async getConatactByGroupId(groupId: string): Promise<Contact[]> {
        return await this.contactRepository.find({
            relations: ['group'],
            where: {
                group: { id: parseInt(groupId) }
            }, select: ['firstName', 'lastName', 'contactId'], withDeleted: false
        })
    }

    async getContactById(contactId: string): Promise<IDetailContact> {
        const contact: Contact = await this.contactRepository.findOne({ where: { contactId: parseInt(contactId) }, select: ['firstName', 'lastName', 'birthDate', 'logo', 'phone', 'url', 'email'] })
        if (!contact) {
            throw new NotFoundException()
        }
        return {
            firstName: contact.firstName,
            lastName: contact.lastName,
            birthDate: `${contact.birthDate.getFullYear()}-${contact.birthDate.getMonth() + 1}-${contact.birthDate.getDay()}`,
            phone: contact.phone,
            email: contact.email,
            url: contact.url,
            logo: contact.logo

        }

    }

    async updateContact(arg: IEditContact): Promise<void> {
        const { contactId, ...Update } = arg
        const updateContact = await this.contactRepository.createQueryBuilder('contact').update(Update).where({ contactId: contactId }).execute()
        if (!updateContact.affected) {
            throw new NotFoundException(arg.contactId);
        }
    }

    async deleteContact(id: string): Promise<void> {
        const deleteOneContact = await this.contactRepository.softDelete(parseInt(id))
        if (!deleteOneContact.affected) {
            throw new NotFoundException(id);
        }
    }
}
