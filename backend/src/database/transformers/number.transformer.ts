import { ValueTransformer } from 'typeorm';

export const NumberTransformer: ValueTransformer = {
  from(dbValue: string) {
    return +dbValue;
  },
  to(entityValue: number) {
    return entityValue;
  },
};
