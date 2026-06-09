export type TIssue ={
    title:string,
    description:string,
    type:string,
    status : string,
    reporter_id : number
}

export interface TIssueQueryParams {
  sort?: "newest" | "oldest";
  type?: string;
  status?: string;
}

export interface TUserMappedResponse {
  id: number;
  name: string;
  role: "contributor" | "maintainer";
}