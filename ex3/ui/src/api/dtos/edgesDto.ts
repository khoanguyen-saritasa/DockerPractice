/** Edges returned when select get all from Graphql. */
export type EdgesDto<T, TQuery extends string> = {

  /** Query key. */
  readonly [P in TQuery]: {

    /** Edges. */
    readonly edges: readonly NodeDto<T>[];
  };
};

/** Node dto, wrapper of entity dto returned from Graphql. */
interface NodeDto<T> {

  /** Node. */
  readonly node: T;
}
