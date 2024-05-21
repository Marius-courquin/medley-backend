import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCustomDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCustomDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }
          const regEx = /^\d{4}-\d{2}-\d{2}$/;
          if (!value.match(regEx)) {
            return false;
          }
          const [year, month, day] = value.split('-').map(Number);
          const date = new Date(year, month - 1, day);
          return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
        },
        defaultMessage(args: ValidationArguments) { // Providing default error message
          return `${args.property} must be a valid date in YYYY-MM-DD format`;
        }
      },
    });
  };
}