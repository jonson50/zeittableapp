export interface Project {
  id: string;
  parentId: string | null;
  active: boolean;
  name: string;
  code: string | null;
}
