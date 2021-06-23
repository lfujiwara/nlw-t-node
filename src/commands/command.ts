export interface Command<I, O> {
  execute: (input: I) => Promise<O>;
}

export class CommandError extends Error {
  constructor(public code?: string) {
    super();
  }
}

export const CommandErrorCodes = {
  EMAIL_ALREADY_REGISTERED: "EMAIL_ALREADY_REGISTERED",
  TAG_NAME_ALREADY_REGISTERED: "TAG_NAME_ALREADY_REGISTERED",
};
