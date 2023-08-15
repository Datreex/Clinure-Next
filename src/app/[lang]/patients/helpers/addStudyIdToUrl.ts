export const addStudyIdToUrl = (url: URL | string, id: string): string => {
  // const newUrl = new URL(url);
  // newUrl.searchParams.set("study_id", id);
  // return newUrl;
  return `${url}?study_id=${id}`;
};
