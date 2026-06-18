import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { Resend } from 'resend';

@Injectable()
export class ContactService {
  private readonly resend = new Resend(process.env.RESEND_API_KEY);

  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepo: Repository<ContactEntity>,
  ) {}

  async create(dto: CreateContactDto): Promise<ContactEntity> {
    const contact = this.contactRepo.create(dto);
    const saved = await this.contactRepo.save(contact);

    await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL!,
      subject: `ახალი შეტყობინება dinamoFC.ge-დან — ${dto.subject}`,
      html: `
        <h2>ახალი შეტყობინება dinamoFC.ge-დან</h2>
        <p><strong>სახელი:</strong> ${dto.fullName}</p>
        <p><strong>მაილი:</strong> ${dto.email}</p>
        <p><strong>თემა:</strong> ${dto.subject}</p>
        <p><strong>შეტყობინება:</strong></p>
        <p>${dto.message}</p>
      `,
    });

    return saved;
  }

  async findAll(): Promise<ContactEntity[]> {
    return this.contactRepo.find({ order: { createdAt: 'DESC' } });
  }
}
