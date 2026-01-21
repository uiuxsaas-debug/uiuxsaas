import { datetime } from "drizzle-orm/mysql-core";
import { boolean, date, integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    credits: integer().default(0),
    plan: varchar({ length: 50 }).default('free').notNull(),
    stripeCustomerId: varchar({ length: 255 }),
    subscriptionId: varchar({ length: 255 }),
    subscriptionStartDate: varchar({ length: 50 }),
    subscriptionEndDate: varchar({ length: 50 }),
    lastMonthlyReset: varchar({ length: 50 }), // Date string ISO format
    maxProjects: integer().default(0),
});


export const ProjectTable = pgTable('project', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    projectId: varchar().notNull().unique(),
    projectName: varchar(),
    theme: varchar(),
    userInput: varchar(),
    device: varchar(),
    createdOn: date().defaultNow(),
    config: json(),
    projectVisualDescription: text(),
    userId: varchar().references(() => usersTable.email).notNull(),
    screenshot: text(),
    isPublic: boolean().default(false)
})

export const ScreenConfigTable = pgTable('screenConfig', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    projectId: varchar(), // Linked to ProjectTable.projectId (no formal FK to avoid migration issues)
    screenId: varchar(),
    screenName: varchar(),
    purpose: varchar(),
    screenDescription: varchar(),
    code: text(),
})

export const ProjectMembersTable = pgTable('projectMembers', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    projectId: varchar().notNull(), /* Linked to ProjectTable.projectId */
    email: varchar({ length: 255 }).notNull(),
    role: varchar({ length: 50 }).default('viewer'),
    addedOn: date().defaultNow()
});
