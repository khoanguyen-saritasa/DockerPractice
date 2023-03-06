/** Nodes returned when select get all from Graphql. */
export type NodesDto<T, TQuery extends string> = {

  /** Query key. */
  readonly [P in TQuery]: {

    /** Nodes. */
    readonly nodes: readonly T[];
  };
};
