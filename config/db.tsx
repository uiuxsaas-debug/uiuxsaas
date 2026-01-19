import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

let _db: NeonHttpDatabase | null = null;

function getDb(): NeonHttpDatabase {
    if (_db) return _db;

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('DATABASE_URL environment variable is not set');
    }

    const sql = neon(databaseUrl);
    _db = drizzle(sql);
    return _db;
}

export const db = new Proxy({} as NeonHttpDatabase, {
    get(_, prop) {
        return getDb()[prop as keyof NeonHttpDatabase];
    }
});