export type ResultError = {
  field?: string,
  statusCode?: number,
  message?: string
}


export type Result<T = never> = {
  wasSuccess: boolean,
  body?: T,
  errors: ResultError[]
}

export class ResultBuilder<T = never> {
  result: Result<T> = {
    wasSuccess: false,
    body: undefined,
    errors: []
  }

  build(): Result<T> {
    return this.result;
  }

  succeed(): ResultBuilder<T> {
    this.result.wasSuccess = true;
    return this;
  }

  fail(): ResultBuilder<T> {
    this.result.wasSuccess = false;
    return this;
  }

  withBody(body: T): ResultBuilder<T> {
    this.result.body = body;
    return this;
  }

  withGeneralError(statusCode?: number, message?: string): ResultBuilder<T> {
    const error: ResultError = {
      statusCode,
      message
    }
    this.result.errors.push(error);
    return this;
  }

  withFieldError(field: string, statusCode?: number, message?: string): ResultBuilder<T> {
    const error: ResultError = {
      field,
      statusCode,
      message
    }
    this.result.errors.push(error);
    return this;
  }
}