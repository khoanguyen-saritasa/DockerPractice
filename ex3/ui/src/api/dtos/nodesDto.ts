/** Nodes returned when select get all from Graphql. */
export interface NodesDto<T> {

  /** Nodes. */
  readonly nodes: readonly T[];
}
