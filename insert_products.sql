-- Script para insertar productos en la base de datos 'store'
-- Basado en las imágenes disponibles en static/assets/img/
-- Fecha: 2026-01-28

USE store;

-- Limpiar tabla de productos (opcional - descomentar si deseas empezar desde cero)
-- DELETE FROM products;
-- ALTER TABLE products AUTO_INCREMENT = 1;

-- ========================================
-- Inserción de productos
-- ========================================

INSERT INTO products (name, description, price, image, stock) VALUES
-- Fragancias Masculinas
('Acqua Di Gio', 'Fragancia masculina fresca y acuática de Giorgio Armani. Notas de bergamota, neroli y pachulí. Ideal para uso diario.', 89.99, 'assets/img/acqua-di-gio.png', 25),

('Sauvage Elixir Dior', 'Concentrado aromático extremo de Dior. Notas de especias, lavanda y ámbar gris. La versión más intensa de Sauvage.', 149.99, 'assets/img/sauvage-elixir-dior.png', 15),

('Le Male Elixir', 'Eau de Parfum de Jean Paul Gaultier. Fragancia oriental amaderada con vainilla y lavanda. Sensual y poderosa.', 95.99, 'assets/img/le-male-elixir.png', 20),

('Boss Bottled Elixir', 'Parfum intenso de Hugo Boss. Notas de incienso, cedro y vetiver. Elegancia masculina refinada.', 105.00, 'assets/img/boss-bottled-elixir.png', 18),

('Invictus Victory', 'Eau de Parfum de Paco Rabanne. Fragancia deportiva y vibrante con notas de limón, vainilla y tonka.', 92.50, 'assets/img/invictus-victory.png', 22),

('Khamrah Lattafa', 'Eau de Parfum oriental y especiado. Notas de canela, dátiles y ámbar. Fragancia árabe de larga duración.', 45.99, 'assets/img/khamrah-lattafa.png', 30),

('Bake Akro', 'Fragancia gourmand única. Notas de almendra, azúcar caramelizada y vainilla. Dulce y adictiva.', 78.00, 'assets/img/bake-akro.png', 12),

('Noir Extreme', 'Tom Ford Noir Extreme. Eau de Parfum oriental amaderado con cardamomo, kulfi y ámbar. Sofisticado y seductor.', 165.00, 'assets/img/noir-extreme.png', 10),

-- Fragancias Femeninas
('Black Opium', 'Eau de Parfum de Yves Saint Laurent. Fragancia adictiva con café, vainilla y flor de naranjo. Moderna y seductora.', 98.99, 'assets/img/black-opium.png', 28),

('Good Girl', 'Carolina Herrera Good Girl. Eau de Parfum floral oriental con almendra, café y jazmín. Icónico zapato de tacón.', 112.00, 'assets/img/good-girl.png', 16),

('Libre Le Parfum', 'Yves Saint Laurent Libre. Fragancia floral lavanda con notas de mandarina, lavanda y vainilla. Libertad y audacia.', 108.50, 'assets/img/libre-le-parfum.png', 19),

-- Fragancias Unisex
('Angels Share', 'Kilian Angels Share. Eau de Parfum gourmand con cognac, roble y canela. Lujoso y envolvente.', 285.00, 'assets/img/angels-share.png', 8),

('Born in Roma Intense', 'Valentino Born in Roma Intense. Eau de Parfum con vainilla bourbon, jazmín y pachulí. Intenso y memorable.', 118.00, 'assets/img/born-in-roma-intense.png', 14);

-- ========================================
-- Verificar inserción
-- ========================================
SELECT COUNT(*) as 'Total productos insertados' FROM products;

-- Mostrar todos los productos
SELECT id, name, price, stock FROM products ORDER BY id;
