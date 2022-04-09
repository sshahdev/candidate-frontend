import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Candidate extends Document {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    mobileNumber: string;

    @Prop({ unique: true })
    identityNumber: string;

    @Prop()
    addressLine1: string;

    @Prop()
    addressLine2: string;

    @Prop()
    country: string;

    @Prop()
    city: string;

    @Prop()
    province: string;

    @Prop()
    postalCode: string;

    @Prop()
    linkedinProfile: string;

    @Prop()
    facebookProfile: string;

    @Prop()
    twitterProfile: string;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
