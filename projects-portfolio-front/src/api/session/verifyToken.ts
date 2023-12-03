import { Result, ResultBuilder } from "../../types/result/result";

export default async function(token: string): Promise<Result> {
  await new Promise(r => setTimeout(r, 2000));

  if (token === 'good-token') {
    return new ResultBuilder()
      .succeed()
      .build();
  }
  return new ResultBuilder()
    .fail()
    .build();
}