-- Profiles table migration (Pengurus/Administrators)
CREATE TABLE IF NOT EXISTS profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  description LONGTEXT,
  image_url VARCHAR(500),
  sort_order INT DEFAULT 999,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (sort_order)
);
