import { AppError } from 'src/models/appError';
import { Vocabulary } from 'src/models/vocabulary';

/** Vocabulary state. */
export interface VocabularyState {

  /** Whether vocabulary is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;

  /** Vocabularies. */
  readonly vocabulariesByTaskId: readonly Vocabulary[];
}

export const initialState: VocabularyState = {
  isLoading: false,
  vocabulariesByTaskId: [],
};
