import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactListController } from './contact-list.controller';
import { ContactListService } from './contact-list.service';
import { Contact } from './entity/contact.entity';
import { Group } from './entity/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Contact])],
  controllers: [ContactListController],
  providers: [ContactListService]
})
export class ContactListModule { }
