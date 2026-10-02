-- Additive tables only. Johnny must review this against the live schema before applying.
CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(60) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME NULL
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS admin_sessions (
  sid VARCHAR(128) NOT NULL PRIMARY KEY,
  data TEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  KEY idx_admin_sessions_expires_at (expires_at)
) DEFAULT CHARSET=utf8mb4;
