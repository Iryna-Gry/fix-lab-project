import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type GadgetDocument = HydratedDocument<Gadget>;

@Schema({ collection: 'gadgets', timestamps: true })
class Gadget {
  @ApiProperty({ example: 'Phone' })
  @Prop()
  title: string;

  @ApiProperty({ example: 'We repair phones' })
  @Prop()
  description: string;

  @ApiProperty({ example: 'phone' })
  @Prop()
  url: string;
}

const GadgetSchema = SchemaFactory.createForClass(Gadget);

GadgetSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export { GadgetSchema, Gadget };