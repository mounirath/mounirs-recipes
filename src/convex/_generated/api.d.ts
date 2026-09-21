/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as access from "../access.js";
import type * as admin from "../admin.js";
import type * as auth from "../auth.js";
import type * as auth_emailOtp from "../auth/emailOtp.js";
import type * as entitlements from "../entitlements.js";
import type * as http from "../http.js";
import type * as payments from "../payments.js";
import type * as recipeDataFr from "../recipeDataFr.js";
import type * as recipeDataHomemade from "../recipeDataHomemade.js";
import type * as recipeDataNatural from "../recipeDataNatural.js";
import type * as recipes from "../recipes.js";
import type * as users from "../users.js";
import type * as webhook from "../webhook.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  access: typeof access;
  admin: typeof admin;
  auth: typeof auth;
  "auth/emailOtp": typeof auth_emailOtp;
  entitlements: typeof entitlements;
  http: typeof http;
  payments: typeof payments;
  recipeDataFr: typeof recipeDataFr;
  recipeDataHomemade: typeof recipeDataHomemade;
  recipeDataNatural: typeof recipeDataNatural;
  recipes: typeof recipes;
  users: typeof users;
  webhook: typeof webhook;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
