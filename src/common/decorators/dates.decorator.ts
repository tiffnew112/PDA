import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsStartBeforeEndConstraint } from './dates.validator.js';

export function IsStartBeforeEnd(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStartBeforeEndConstraint,
    });
  };
}
