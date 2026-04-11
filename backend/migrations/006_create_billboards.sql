-- Billboards table migration (untuk iklan/banner di semua halaman)
CREATE TABLE IF NOT EXISTS billboards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  link VARCHAR(500),
  sort_order INT DEFAULT 999,
  is_active TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (sort_order),
  INDEX (is_active)
);
