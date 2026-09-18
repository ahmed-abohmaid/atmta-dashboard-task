import { MongoAbility, RawRuleOf } from "@casl/ability";

export type AppAction =
  | "manage"
  | "read"
  | "create"
  | "update"
  | "delete"
  | "export"
  | (string & {});

export type AppSubject =
  | "all"
  | "users"
  | "roles"
  | "categories"
  | "vendors"
  | (string & {});

export type AppAbility = MongoAbility<[AppAction, AppSubject]>;
export type AppRule = RawRuleOf<AppAbility>;

export interface Permission {
  action: AppAction;
  subject: AppSubject;
  inverted?: boolean;
}
