import { Result, ResultBuilder } from "../../types/result/result";

export default async function deleteProject(id: string): Promise<Result> {
  return new ResultBuilder()
    .fail()
    .build();
}