import { Logger } from '@nestjs/common';

export function ImplementLogger<T extends { new (...args: any[]): {} }>(
  ctr: T,
) {
  return class extends ctr {
    logger = new Logger(ctr.name);

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
