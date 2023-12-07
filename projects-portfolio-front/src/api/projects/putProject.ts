import helpers from "../../helpers";
import { NewProject } from "../../types/project/newProject";
import { ProjectSummary } from "../../types/project/projectSummary";
import { Result, ResultBuilder } from "../../types/result/result";

export default async function(newProject: NewProject, sessionToken: string | null | undefined): Promise<Result> {
  const apiUrl = process.env.API_URL! + '/projects';
  const [ timeout, signal ] = helpers.api.createAbortController();
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      body: newProjectToFormData(newProject),
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      },
      signal: signal
    });
    if (!response.ok) {
      return new ResultBuilder()
        .fail()
        .withGeneralError(response.status)
        .build();
    }
    return new ResultBuilder()
      .succeed()
      .build();    
  } catch {
    return new ResultBuilder()
      .fail()
      .withGeneralError(503)
      .build();
  } finally {
    clearTimeout(timeout);
  }
}

function newProjectToFormData(project: NewProject): FormData {
  const formData = new FormData();

  const { images, ...rest } = project;
  formData.append('json', JSON.stringify(rest));

  if (project.images != null) {
    const _images = Array.from(project.images);
    _images.forEach(image => {
      formData.append('images', image);
    });
  }

  return formData;
}