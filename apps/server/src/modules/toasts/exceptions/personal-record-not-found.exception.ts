import { HttpException, HttpStatus } from '@nestjs/common';

export class PersonalRecordNotFoundException extends HttpException {
  constructor(userId: string) {
    super(
      `Record with this id  -- > '${userId}' not found`,
      HttpStatus.NOT_FOUND
    );
  }
}
