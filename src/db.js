import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

let db = null;

export const initDB = async () => {
  if (db) return db;
  
  try {
    const sqlite3 = await sqlite3InitModule({
      print: console.log,
      printErr: console.error,
    });

    if ('opfs' in sqlite3) {
      db = new sqlite3.oo1.OpfsDb('/pet_vitals.sqlite3');
    } else {
      db = new sqlite3.oo1.DB('/pet_vitals.sqlite3', 'ct');
    }

    db.exec(`
      CREATE TABLE IF NOT EXISTS vitals (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        name TEXT,
        hunger INTEGER,
        happiness INTEGER,
        energy INTEGER,
        status TEXT,
        life_stage TEXT DEFAULT 'egg',
        action_count INTEGER DEFAULT 0,
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    return db;
  } catch (err) {
    console.error('SQLite initialization failed:', err.message);
    return null;
  }
};

export const saveVitals = (vitals, status, lifeStage, actionCount, name) => {
  if (!db) return;
  db.exec({
    sql: `INSERT OR REPLACE INTO vitals (id, hunger, happiness, energy, status, life_stage, action_count, name) VALUES (1, ?, ?, ?, ?, ?, ?, ?)`,
    bind: [vitals.hunger, vitals.happiness, vitals.energy, status, lifeStage, actionCount, name]
  });
};

export const loadVitals = () => {
  if (!db) return null;
  const rows = db.selectObjects('SELECT * FROM vitals WHERE id = 1');
  return rows.length > 0 ? rows[0] : null;
};
