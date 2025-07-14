export interface IPreview {
  title: string,
  picture: string,
  description: string,
  _id: string
}
export type level = "beginner" | "intermediate" | "advanced" | "proficient"
export interface IPreviewNoID{
  title: string,
  picture: string,
  description: string,
  level: level
}