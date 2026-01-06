import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(), // clerkId
    email: v.string(),
    name: v.string(),
    isPro: v.boolean(),
    proAmount: v.optional(v.number()),
    proSince: v.optional(v.number()),
    lemonSqueezyCustomerId: v.optional(v.string()),
    lemonSqueezyOrderId: v.optional(v.string()),
    lemonSqueezySubscriptionId: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),

  codeExecutions: defineTable({
    userId: v.id("users"),
    language: v.string(),
    code: v.string(),
    error: v.optional(v.string()),
    output: v.optional(v.string()),
    result: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),

  snippets: defineTable({
    userId: v.id("users"),
    title: v.string(),
    language: v.string(),
    code: v.string(),
    userName: v.string(),
  }).index("by_user_id", ["userId"]),

  snippetComments: defineTable({
    snippetId: v.id("snippets"),
    content: v.string(),
    userName: v.string(),
    userId: v.string(),
  }).index("by_snippet_id", ["snippetId"]),

  stars: defineTable({
    userId: v.string(),
    snippetId: v.id("snippets"),
  })
    .index("by_snippet_id_and_user_id", ["snippetId", "userId"])
    .index("by_user_id", ["userId"])
    .index("by_snippet_id", ["snippetId"]),
});
