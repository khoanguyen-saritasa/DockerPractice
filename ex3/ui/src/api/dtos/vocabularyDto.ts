/** Vocabulary dto. */
export interface VocabularyDto {

  /** Id. */
  readonly id: number;

  /** English word. */
  readonly english: string;

  /** Translation to vietnamese. */
  readonly vietnamese: string;

  /** Translation to russian. */
  readonly russian: string;

  /** Task ID. */
  readonly taskId: number;

  /** Task name. */
  readonly taskName: number;
}
