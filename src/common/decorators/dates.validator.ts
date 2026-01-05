import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsStartBeforeEnd', async: false })
export class IsStartBeforeEndConstraint implements ValidatorConstraintInterface {
  validate(startTime: string, args: ValidationArguments) {
    const object = args.object as any;
    const endTime = object.endTime;

    if (!startTime || !endTime) return true; // let other validators handle this

    return new Date(startTime).getTime() < new Date(endTime).getTime();
  }

  defaultMessage(args: ValidationArguments) {
    return 'startTime must be earlier than endTime';
  }
}
