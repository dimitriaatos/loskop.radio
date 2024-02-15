import type { ShowQuery } from "#gql";

type OptionalShow = NonNullable<NonNullable<ShowQuery["items"]>["shows"]>[0];

export type NonNullableProps<T> = NonNullable<{
  [K in keyof T]: NonNullable<T[K]>;
}>;

export type Show = NonNullable<NonNullableProps<OptionalShow>>;
